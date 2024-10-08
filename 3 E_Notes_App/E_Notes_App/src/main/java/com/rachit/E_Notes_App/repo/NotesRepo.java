package com.rachit.E_Notes_App.repo;

import com.rachit.E_Notes_App.model.Notes;
import com.rachit.E_Notes_App.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotesRepo extends JpaRepository<Notes, Integer> {

    List<Notes> findByUser(User user);

}
