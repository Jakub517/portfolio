<?php
$scores = json_decode(file_get_contents('scores.json'), true);

usort($scores, function($a, $b) {
    return $b['score'] - $a['score'];
});

$scores = array_slice($scores, 0, 5);

echo json_encode($scores);
?>
