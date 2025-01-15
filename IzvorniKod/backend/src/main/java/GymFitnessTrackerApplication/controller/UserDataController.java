package GymFitnessTrackerApplication.controller;

import GymFitnessTrackerApplication.model.dao.MyUserRepository;
import GymFitnessTrackerApplication.model.domain.Measurement;
import GymFitnessTrackerApplication.model.domain.MyUser;
import GymFitnessTrackerApplication.model.domain.NutrionPlan;
import GymFitnessTrackerApplication.model.dto.forms.BodyGoalsForm;
import GymFitnessTrackerApplication.model.dto.forms.BodyMeasurementForm;
import GymFitnessTrackerApplication.model.dto.response.BodyMeasurementsResponse;
import GymFitnessTrackerApplication.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserDataController {

    @Autowired
    private  MyMeasurementsService myMeasurementsService;
    @Autowired
    private NutrionService myNutrionService;
    @Autowired
    private MyUserService myUserService;
    @Autowired
    private MyUserRepository myUserRepository;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/body-measurements/previous")
    public ResponseEntity<?> setBodyMeasurements(@RequestBody BodyMeasurementForm bodyMeasForm, @RequestHeader("Authorization") String auth){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Measurement m = myMeasurementsService.createMeasurement(user,bodyMeasForm,"current");

        return ResponseEntity.status(HttpStatus.valueOf(200)).body(new BodyMeasurementsResponse(m));
    }

    @PostMapping("/body-measurements/goals")
    public ResponseEntity<?> setGoalBodyMeasurements(@RequestBody BodyMeasurementForm bodyMeasForm, @RequestHeader("Authorization") String auth){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Measurement m = myMeasurementsService.createMeasurement(user,bodyMeasForm,"goals");
        return ResponseEntity.status(HttpStatus.valueOf(200)).body(new BodyMeasurementsResponse(m));
    }

    @GetMapping("/body-measurements/previous")
    public ResponseEntity<?> getBodyMeasurements(@RequestHeader("Authorization") String auth) {
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        List<Measurement> m = myMeasurementsService.getMyMeasurements(user);

        if(m.isEmpty()) return ResponseEntity.status(HttpStatus.valueOf(200)).body("");
        List<BodyMeasurementsResponse> bm = new ArrayList<>();
        m.forEach( measurement -> {bm.add(new BodyMeasurementsResponse(measurement));});

        return ResponseEntity.status(HttpStatus.valueOf(200)).body(bm);
    }

    @GetMapping("/body-measurements/goals")
    public ResponseEntity<?> getGoalBodyMeasurements(@RequestHeader("Authorization") String auth) {
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        List<Measurement> m = myMeasurementsService.getMyGoalMeasurements(user);
        if(m.isEmpty()) return ResponseEntity.status(HttpStatus.valueOf(200)).body("");
        List<BodyMeasurementsResponse> bm = new ArrayList<>();
        m.forEach( measurement -> {bm.add(new BodyMeasurementsResponse(measurement));});
        return ResponseEntity.status(HttpStatus.valueOf(200)).body(bm);
    }



    @PostMapping("/body-stats-and-goals")
    public ResponseEntity<?> setGoals(@RequestBody BodyGoalsForm form, @RequestHeader("Authorization") String auth){
        String email= jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        myUserService.updateUserFromForm(user,form);
        myMeasurementsService.createGoalMeasurementFromStats(user,form);
        myNutrionService.createNutrionFromForm(user,form);
        //myUserService.updateCurrentNutrion(user,nutrionPlan);
        return ResponseEntity.status(HttpStatus.valueOf(200)).body("Created nutrion plan and goal body measurements");
    }



    /*  @PostMapping("/body-stats-and-goals")
      public ResponseEntity<?> setBodyGoals(@RequestBody BodyGoalsForm bodyGoalsForm, @RequestHeader("Authorization") String auth)
      {
              String email= jwtService.extractEmail(auth.trim().substring(7));
              MyUser user = (MyUser) myUserService.getMyUser(email);
              Optional<Goals> stats = statsRepo.findById(user.getId());
              Goals goals;
              if(stats.isEmpty()){
                  goals = myGoalsStatsService.createGoals(user,bodyGoalsForm);
              }else{
                   myGoalsStatsService.updateGoals(user,bodyGoalsForm);
              }
              goals = statsRepo.findById(user.getId()).get();

              return ResponseEntity.status(HttpStatus.valueOf(200)).body(
                      //
                      //new BodyGoalsResponse(user.getId().toString(), goals.getHeight(), goals.getWeight(), goals.getGoalWeight(), goals.getActivityLevel().name(), goals.getGender().name(), goals.getTimelineWeeks(), goals.getProtein(), goals.getCarbs(), goals.getFat(), goals.getCalories(), goals.getCreatedAt(), goals.getCreatedAt())
                      "lol");
      }*/

    /*@GetMapping("/info")
    public ResponseEntity<?> getInfoAbtUser(@RequestHeader("Authorization") String auth){
        String email = jwtService.extractEmail(auth.trim().substring(7));
        MyUser user = (MyUser) myUserService.getMyUser(email);
        Optional<Goals> statsGoals = statsRepo.findById(user.getId());

        if(statsGoals.isEmpty()){
            return ResponseEntity.status(HttpStatus.valueOf(403)).body("No user stats");
        }
        Goals stats = statsGoals.get();
        return ResponseEntity.status(HttpStatus.OK).body(
                //new InfoResponse(stats.getHeight(),stats.getWeight(),stats.getGoalWeight(),stats.getActivityLevel().toString(),stats.getGender().toString())
                "lol");


    }*/

    /*da ne izgubim primjer
    @PostMapping("/body-measurements")
    public ResponseEntity<?> setBodyMeasurements(@RequestBody BodyMeasurementForm bodyMeasForm, @RequestHeader("Authorization") String auth){
        try{
            String email= jwtService.extractEmail(auth.trim().substring(7));
            MyUser user = (MyUser) myUserService.getMyUser(email);
            Measurement m = myMeasurementsService.createMeasurement(user,bodyMeasForm);

            return ResponseEntity.status(HttpStatus.valueOf(200)).body(new BodyMeasurementsResponse(m.getMeasurementId().toString(),user.getId().toString(),bodyMeasForm.getDate(),bodyMeasForm.getChest(),bodyMeasForm.getWaist(),bodyMeasForm.getHips(),bodyMeasForm.getThighs(),bodyMeasForm.getBiceps(),bodyMeasForm.getDate(),m.getUpdated_at()));

        }catch(UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(0,"Invalid email sent"));
        }catch (ExpiredJwtException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(0,"JWT expired"));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(0, "Internal Server Error"));
        }
    }*/


    //AWS S3 sheme
    @PostMapping("/image")
    public ResponseEntity<?> uploadProfileImage(@RequestParam("file") MultipartFile file, @RequestHeader("Authorization") String token){
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }
        System.out.println("treba se uploadat");
        String email = jwtService.extractEmail(token.trim().substring(7));
        myUserService.deleteFile(email);
        myUserService.uploadFile(email,file);

        return ResponseEntity.ok().body("File uploaded successfully");
    }

    @GetMapping("/image")
    public ResponseEntity<?> getURLToProfileImage(@RequestHeader("Authorization") String token){
        String email = jwtService.extractEmail(token.trim().substring(7));
        String url =myUserService.getURLToFile(email);
        return ResponseEntity.ok().body(url);
    }
}