<?php
header('Content-Type: application/json');

// Directory containing the images
$directory = 'samples/';

// Get all image files from the directory
$images = [];
$allowed_types = ['jpg', 'jpeg', 'png', 'gif'];

if (is_dir($directory)) {
    $files = scandir($directory);
    
    foreach ($files as $file) {
        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        
        // Check if file is an allowed image type
        if (in_array($extension, $allowed_types)) {
            $images[] = [
                'name' => pathinfo($file, PATHINFO_FILENAME),
                'path' => $directory . $file
            ];
        }
    }
}

// Sort images by name
usort($images, function($a, $b) {
    return strcmp($a['name'], $b['name']);
});

echo json_encode($images);
