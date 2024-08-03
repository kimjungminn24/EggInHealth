package com.egginhealth.data.repository;

import com.egginhealth.data.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query("SELECT co FROM Comment co WHERE co.boardId = :boardId AND co.boardType = :boardType ORDER BY co.createdAt ASC")
    List<Comment> findByDietCommentToDay(int boardId, String boardType);

}
