package com.kh.wob.controller;

import com.kh.wob.dto.AdDto;
import com.kh.wob.dto.CategoryDto;
import com.kh.wob.service.AdService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/ad") // get 형식
@RequiredArgsConstructor
public class AdController {
    private final AdService adService;

    // 광고 목록
    @GetMapping("/list")
    public ResponseEntity<List<AdDto>> adList() {
        List<AdDto> list = adService.getAdList();
        return ResponseEntity.ok(list);
    }
    // 광고 활성화, 비활성화 상태 바꾸기
    @PutMapping("/state")
    public ResponseEntity<Boolean> updateAdActive(@RequestBody AdDto adDto) {
        log.info("adDto: {}", adDto);
        boolean isTrue = adService.updateAdActive(adDto);
        return ResponseEntity.ok(isTrue);
    }
    // 광고 목록 페이지네이션
    @GetMapping("/list/page")
    public ResponseEntity<List<AdDto>> getAdPageList(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "5") int size) {
        List<AdDto> list = adService.getAdPageList(page, size);
        return ResponseEntity.ok(list);
    }
    // 광고 페이지 수 조회
    @GetMapping("/count")
    public ResponseEntity<Integer> listAd(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "5") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Integer pageCnt = adService.getAds(pageRequest);
        return ResponseEntity.ok(pageCnt);
    }
    // 광고 검색
}
