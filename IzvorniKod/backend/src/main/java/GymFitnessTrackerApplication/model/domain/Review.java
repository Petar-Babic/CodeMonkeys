package GymFitnessTrackerApplication.model.domain;

import GymFitnessTrackerApplication.model.dto.workoutDTOs.ReviewDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Review {

    @Id
    @GeneratedValue
    private Long id;

    private Integer rating;
    private String comment;


    public Review(ReviewDTO reviewDTO) {
        this.rating = reviewDTO.rating();
        this.comment = reviewDTO.comment();
    }
    public Review() {}

    public Long getId() {
        return id;
    }

    public Integer getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
