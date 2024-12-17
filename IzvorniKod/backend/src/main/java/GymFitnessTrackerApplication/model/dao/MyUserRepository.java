package GymFitnessTrackerApplication.model.dao;

import GymFitnessTrackerApplication.model.domain.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface MyUserRepository extends JpaRepository<MyUser, Long> {
    Optional<MyUser> findByEmail(String email);

    int countByEmail(String email);
}
