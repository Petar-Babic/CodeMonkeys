package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface RefreshTokenRepo extends JpaRepository<RefreshToken,Long> {

    // kada se trazi refresh
    public Optional<RefreshToken> findByToken(String token);


    //kada se logina/registrira
    public  Optional<RefreshToken> findByMyUser(MyUser myUser);


   //logout jebeni
    public  Long deleteByToken(String token);

    public void deleteByMyUser(MyUser user);

}
