package GymFitnessTrackerApplication.service;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.dto.response.UserDetailsResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import javax.crypto.SecretKey;

@Service
public class JwtService {

    private static final String SECRET = "799AF37F810D29185B919E78D773D6DB98904D2F9437657FE636D0EDB08871DABE9C7E088E15E03D5992BB14861B3C0ED2271072AEF28BA6ACBC0B961E3AA866";
    private static final long VALIDITY = TimeUnit.MINUTES.toMillis(999999999);

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .claim("role",userDetails.getAuthorities())
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusMillis(VALIDITY)))
                .signWith(generateKey())
                .compact();
    }

    public String generateToken(MyUser userDetails) {
        return Jwts.builder()
                .subject(userDetails.getEmail())
                .claim("role", userDetails.getRole().toString())
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusMillis(VALIDITY)))
                .signWith(generateKey())
                .compact();
    }

    public String generateTokenTrainer(UserDetails userDetails, List<UserDetailsResponse> users) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(Instant.now()))
                .claim("role",userDetails.getAuthorities())
                .claim("users",users)
                .expiration(Date.from(Instant.now().plusMillis(VALIDITY)))
                .signWith(generateKey())
                .compact();
    }
    public String generateTokenTrainer(MyUser user, List<UserDetailsResponse> users) {
        return Jwts.builder()
                .subject(user.getEmail())
                .issuedAt(Date.from(Instant.now()))
                .claim("role",user.getRole().toString())
                .claim("users",users)
                .expiration(Date.from(Instant.now().plusMillis(VALIDITY)))
                .signWith(generateKey())
                .compact();
    }

    public String generateForTraining(UserDetails userDetails, String userId) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(Instant.now()))
                .claim("role",userDetails.getAuthorities())
                .claim("userId",userId)
                .expiration(Date.from(Instant.now().plusMillis(VALIDITY)))
                .signWith(generateKey())
                .compact();
    }

    public String generateForTraining(MyUser user, String userId) {
        return Jwts.builder()
                .subject(user.getEmail())
                .issuedAt(Date.from(Instant.now()))
                .claim("role",user.getRole())
                .claim("userId",userId)
                .expiration(Date.from(Instant.now().plusMillis(VALIDITY)))
                .signWith(generateKey())
                .compact();
    }
    private SecretKey generateKey() {
        byte[] decodedKey = Base64.getDecoder().decode(SECRET);
        return Keys.hmacShaKeyFor(decodedKey);
    }

    public String extractEmail(String jwt) {
        Claims claims = getClaims(jwt);
        return claims.getSubject();
    }

    public String extractUserId(String jwt){
        Claims claims = getClaims(jwt);
        return claims.get("userId",String.class);
    }

    private Claims getClaims(String jwt) {
        return Jwts.parser()
                .verifyWith(generateKey())
                .build()
                .parseSignedClaims(jwt)
                .getPayload();
    }

    public boolean isTokenValid(String jwt) {
        Claims claims = getClaims(jwt);
        return claims.getExpiration().after(Date.from(Instant.now()));
    }
}
