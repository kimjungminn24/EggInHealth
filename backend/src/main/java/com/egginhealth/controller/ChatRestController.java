package com.egginhealth.controller;

import com.egginhealth.data.dto.chat.ChatListDto;
import com.egginhealth.service.ChatRoomService;
import com.egginhealth.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatRestController {

    private final ChatRoomService chatRoomService;

    @GetMapping("/list")
    public ResponseEntity<List<ChatListDto>> getChatList() {
        return new ResponseEntity<>(chatRoomService.getChatList(SecurityUtil.getUserId()), HttpStatus.OK);
    }
}
