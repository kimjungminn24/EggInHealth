package com.egginhealth.data.dto;

import com.egginhealth.data.entity.Chat;
import com.egginhealth.data.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ChatDto {

    private int id;
    private ChatRoomDto chatRoomDto;

    public static ChatDto from(Chat chat){
        return ChatDto.builder()
                .id(chat.getId())
                .chatRoomDto(ChatRoomDto.from(chat.getChatRoom()))
                .build();
    }


}
