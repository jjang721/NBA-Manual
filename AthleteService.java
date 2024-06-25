package com.jj.playerlist;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.jj.playerlist.Constants.PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class AthleteService {
    private final AthleteRepository athleteRepository;

    public Page<Athlete> getAllAthletes(int page, int size) {
        return athleteRepository.findAll(PageRequest.of(page,size, Sort.by("name")));
    }
    public Athlete getAthlete(String id) {
        return athleteRepository.findById(id).orElseThrow(() ->
        new RuntimeException("Athlete not found"));
    }
    public Athlete createAthlete(Athlete athlete){
        return athleteRepository.save(athlete);
    }
    public void deleteAthlete(Athlete athlete){
       // return athleteRepository.save(athlete);
    }

    public String uploadPhoto(String id, MultipartFile file){
        Athlete athlete = getAthlete(id);
        String photoUrl = photoFunction.apply(id,file);
        athlete.setPhotoURL(photoUrl);
        athleteRepository.save(athlete);
        return photoUrl;

    }
    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(
            name -> name.contains(".")).map(name -> "." + name.substring(filename.lastIndexOf(".")
            + 1)).orElse(".png");


    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image ) -> {
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)){
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(id + fileExtension.apply(
                    image.getOriginalFilename())),
                    REPLACE_EXISTING);
            return ServletUriComponentsBuilder.fromCurrentContextPath().path("/athletes/image/" + id +
                    fileExtension.apply(image.getOriginalFilename())).toUriString();
        }catch (Exception exception){
            throw new RuntimeException("Unable to save image");
        }
    };
}
