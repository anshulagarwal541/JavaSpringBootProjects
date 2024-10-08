package com.rachit.E_Notes_App.controller;

import com.rachit.E_Notes_App.model.Notes;
import com.rachit.E_Notes_App.model.User;
import com.rachit.E_Notes_App.service.NotesService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private NotesService notesService;

    @RequestMapping("/addNote")
    public String addNote(HttpServletRequest req, HttpServletResponse res) {
        return "addNote";
    }

    @RequestMapping("/editNote/{noteId}")
    public String editNote(@PathVariable("noteId") int noteId, HttpServletRequest req, HttpServletResponse res, HttpSession session) {
        Notes note = notesService.findById(noteId);
        session.setAttribute("currentNote", note);
        return "editNote";
    }

    @RequestMapping("/notes")
    public String notes(HttpServletRequest req, HttpServletResponse res, HttpSession session) {
        User user = (User) session.getAttribute("user");
        List<Notes> allNotes = notesService.findAllByUser(user);
        session.setAttribute("notes", allNotes);
        return "allNotes";
    }

    @RequestMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("user");
        return "redirect:/login";
    }

    @PostMapping("/addNote")
    public String postNote(@ModelAttribute Notes note, HttpSession session) {
        User user = (User) session.getAttribute("user");
        note.setUser(user);
        notesService.setNote(note);
        session.setAttribute("success", "Successfully saved the notes..!!");
        return "redirect:/user/addNote";
    }

    @PostMapping("/editNote/{noteId}")
    public String editPostNote(HttpSession session, @PathVariable("noteId") int noteId, @ModelAttribute Notes note, HttpServletRequest req, HttpServletResponse res) {
        Notes currentNote = notesService.findById(noteId);
        if (currentNote == null) {
            session.setAttribute("error", "Note to be updated not found..");
            return "redirect:/user/notes";
        }
        Notes updatedNote = notesService.updateNote(currentNote, note);
        if (updatedNote == null) {
            session.setAttribute("error", "Error occurred..!!");
        } else {
            session.setAttribute("success", "Note updated Successfully..!!!");
        }
        return "redirect:/user/editNote/" + noteId;
    }

    @RequestMapping("/deleteNote/{noteId}")
    public String deleteNote(HttpSession session, @PathVariable("noteId") int noteId, HttpServletRequest req, HttpServletResponse res) {
        notesService.deleteNote(noteId);
        session.setAttribute("success", "Note deleted successfully...");
        return "redirect:/user/notes";
    }

}