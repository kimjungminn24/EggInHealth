package com.egginhealth.data.dto.chat;

import com.egginhealth.data.entity.Chat;
import lombok.Builder;
import lombok.Getter;

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