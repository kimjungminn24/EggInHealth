package com.egginhealth.data.dto.diet;

import com.egginhealth.data.dto.comment.CommentDietDto;
import com.egginhealth.data.entity.Diet;
import com.egginhealth.data.repository.CommentRepository;
import com.egginhealth.service.CommentService;

import java.time.LocalDateTime;
import java.util.List;

public record DietDayOutputDto(
    int id,
    int type,
    LocalDateTime date,
    String imgurl,
    List<CommentDietDto> commentList
) {

    public static DietDayOutputDto from (Diet diet, List<CommentDietDto> commentList){

        return new DietDayOutputDto(
                diet.getId(),
                diet.getType(),
                diet.getDate(),
                diet.getImgUrl(),
                commentList);
    }
}
