package GymFitnessTrackerApplication.dao;

import GymFitnessTrackerApplication.domain.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MyUserRepository extends JpaRepository<MyUser, Long> {
    Optional<MyUser> findByEmail(String email);

}
