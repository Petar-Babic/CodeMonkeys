package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.exception.NonExistantToken;
import GymFitnessTrackerApplication.exception.RefreshTokenExpiredException;
import GymFitnessTrackerApplication.model.dao.MyStatsGoalsRepo;
import GymFitnessTrackerApplication.model.dao.MyUserRepository;
import GymFitnessTrackerApplication.model.dao.RefreshTokenRepo;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.RefreshToken;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.apache.tomcat.util.http.CookiesWithoutEquals;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.lang.ref.Reference;
import java.sql.Ref;
import java.text.CollationKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class RefreshTokenService {

    @Autowired
    private MyUserService myUserService;

    @Autowired
    private RefreshTokenRepo refreshTokenRepo;

     // EXPIRY - 7day
    public static int expiryTime = 7;

    public Optional<RefreshToken> findByToken(String token){
        return refreshTokenRepo.findByToken(token);
    }

    public Optional<RefreshToken> findByUser(MyUser user){
        return refreshTokenRepo.findByMyUser(user);
    }


    @Transactional
    public String forsakeToken(HttpServletRequest req) throws NonExistantToken {
        if (req.getCookies() != null) {
            for (Cookie c : req.getCookies()) {
                if ("Refresh".equals(c.getName())) { // Avoid potential NullPointerException
                    String token = c.getValue();
                    Optional<RefreshToken> ref = findByToken(token);

                    ref.orElseThrow(() -> new NonExistantToken("Token not found in database"));
                    refreshTokenRepo.delete(ref.get());

                    return "Invalidated key";
                }
            }
        }
        throw new NonExistantToken("No refresh token cookie found");
    }

    public RefreshToken createToken(String username){
        MyUser user = myUserService.getMyUser(username);
        //bullshiting
        RefreshToken token = new RefreshToken(generirajToken(),Instant.now().plus(expiryTime,ChronoUnit.DAYS),user);
        return refreshTokenRepo.save(token);
    }

    // tip ili preko username ili preko tokena
    @Transactional
    public RefreshToken getToken(String value,String tip){
        RefreshToken tok;
        if(tip.equals("mail")){
            MyUser user = myUserService.getMyUser(value);
            Optional<RefreshToken> token = findByUser(user);
            if(token.isEmpty() || expired(token.get().getToken())){
                if(token.isEmpty()){
                    tok = new RefreshToken(generirajToken(),Instant.now().plus(expiryTime,ChronoUnit.DAYS),user);
                    return refreshTokenRepo.save(tok);
                }
                 refreshTokenRepo.deleteByMyUser(token.get().getMyUser());
                tok = new RefreshToken(generirajToken(),Instant.now().plus(expiryTime,ChronoUnit.DAYS),user);
                return refreshTokenRepo.save(tok);
            }
            else return refreshTokenRepo.findByMyUser(user).get();
        }
        return null;
    }



    public boolean isValid(String token){
        if(refreshTokenRepo.findByToken(token).isEmpty())
            return false;
        return true;
    }
    public boolean expired(String token){
        if(!isValid(token))
            return false;
        RefreshToken tok = refreshTokenRepo.findByToken(token).get();
        if(tok.getExpiry().isAfter(Instant.now()))
            return true;
        return false;
    }

    public String generirajToken(){
        return UUID.randomUUID().toString();
    }

}
