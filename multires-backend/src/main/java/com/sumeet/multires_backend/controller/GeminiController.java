package com.sumeet.multires_backend.controller;


import org.springframework.ai.google.genai.GoogleGenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gemini")
@CrossOrigin("*")
public class GeminiController {

    private GoogleGenAiChatModel chatModel;

    public GeminiController(GoogleGenAiChatModel chatModel){
        this.chatModel=chatModel;
    }
    @GetMapping("/{message}")
    public ResponseEntity<String> getResponse(@PathVariable String message){

        String response= chatModel.call(message);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
