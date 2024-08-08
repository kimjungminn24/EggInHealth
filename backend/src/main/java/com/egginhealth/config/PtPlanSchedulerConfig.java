package com.egginhealth.config;

import com.egginhealth.service.PTPlanService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class PtPlanSchedulerConfig {

    private final PTPlanService ptPlanService;

    @Scheduled(cron = "0 0/30 * * * *")
    public void decreasePtCount() {
        log.info("Decrease PT Plan Count");
        ptPlanService.decreasePtCount();
    }

}
