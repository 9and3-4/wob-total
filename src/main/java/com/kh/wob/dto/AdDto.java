package com.kh.wob.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AdDto {
    private Long id;
    private String title; // 제목
    private String name; // 종목
    private Long fee; // 비용
    private String period;  // 광고 게시기간
    private String image; // 이미지
    private LocalDateTime regDate; // 작성일자
    private String active; // 비활성화, 활성화
}