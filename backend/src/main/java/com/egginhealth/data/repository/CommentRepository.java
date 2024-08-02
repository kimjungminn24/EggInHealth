package com.egginhealth.data.repository;

import com.egginhealth.data.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByBoardIdAndBoardType(int boardId, String boardType);

}
