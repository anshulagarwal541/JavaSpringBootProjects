package com.rachit.E_Notes_App.service;


import com.rachit.E_Notes_App.model.Notes;
import com.rachit.E_Notes_App.model.User;
import com.rachit.E_Notes_App.repo.NotesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotesService {

    @Autowired
    private NotesRepo repo;

    public void setNote(Notes note) {
        repo.save(note);
    }

    public List<Notes> findAllByUser(User userId) {
        return repo.findByUser(userId);
    }

    public Notes findById(int noteId) {
        return repo.findById(noteId).orElse(new Notes());
    }

    public Notes updateNote(Notes currentNote, Notes note) {
        currentNote.setTitle(note.getTitle());
        currentNote.setDescription(note.getDescription());
        repo.save(currentNote);
        return repo.findById(currentNote.getId()).orElse(new Notes());
    }

    public void deleteNote(int noteId){
        repo.deleteById(noteId);
    }

}
