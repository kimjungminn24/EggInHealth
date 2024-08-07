package com.egginhealth.data.dto.chat;

import java.util.List;

public record ChatRoomDto(
        String id,
        List<ChatDto> chatDtoList
) {
    public static ChatRoomDto from(String roomId, List<ChatDto> chatDtoList) {
        return new ChatRoomDto(
                roomId,
                chatDtoList
        );
    }
}
