package com.egginhealth.controller;


import com.egginhealth.data.dto.GoalDto;
import com.egginhealth.service.GoalService;
import com.egginhealth.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/goal")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;


    @PutMapping
    public ResponseEntity<Void> putGoalBy(@RequestBody @Valid GoalDto goalDto) {
        goalService.saveGoal(goalDto, SecurityUtil.getUserId());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{uid}")
    public ResponseEntity<GoalDto> GetGoalBy(@PathVariable("uid") int uid) {
        return new ResponseEntity<>(goalService.getGoal(uid), HttpStatus.OK);
    }

}
