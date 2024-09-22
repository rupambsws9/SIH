var player;
var completedTasks = 0;
const totalTasks = document.querySelectorAll("#videoList li").length - 1; // Exclude quiz link
const watchedThreshold = 80; // Percentage to consider the video as watched
const videoIds = [
  "U6nnRte5M70",
  "IEluFKIoChI",
  "VwII4y5vpyU",
  "oyjYgmsM00Q",
  "jxhuopeNAHE",
  "KCaxZaIZYs8",
  "8gVvGAWJGps",
  "ttDnA14EhdM",
  "99nN7WWNF1Q",
  "dg2IYoXil6M",
  "oFl3nkghbHE",
  "CITc2AxYnPY",
  ]; //all video IDs
let currentVideoIndex = 0; // current video index
const visitedVideos = new Set(); // visited videos
let quizMode = false; // quiz mode is active or not

// YouTube IFrame API
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "630",
    width: "100%",
    videoId: videoIds[currentVideoIndex],
    events: {
      onStateChange: onPlayerStateChange,
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  if (!quizMode) {
    setInterval(checkVideoProgress, 1000);
  }
}

function changeVideo(index) {
  if (index >= 0 && index < videoIds.length) {
    const videoId = videoIds[index];
    player.loadVideoById(videoId);
    currentVideoIndex = index;

    // Mark the video as visited and clicked
    markVideoAsVisitedAndClicked(videoId);
  }
}

function markVideoAsVisitedAndClicked(videoId) {
  const currentVideo = document.querySelector([data-video-id="${videoId}"]);
  if (!currentVideo) return;

  // Check if the video is already marked as green (completed)
  if (currentVideo.classList.contains("green")) return;

  // If not green, proceed with marking as visited and clicked
  if (!visitedVideos.has(videoId)) {
    visitedVideos.add(videoId);
    currentVideo.classList.add("visited"); // Mark as visited (dark blue)
  }

  currentVideo.classList.add("purple"); // Mark as clicked (purple)
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !quizMode) {
    checkVideoProgress();
  }
}

function checkVideoProgress() {
  if (!player || quizMode) return;

  const currentTime = player.getCurrentTime();
  const duration = player.getDuration();
  const percentageWatched = (currentTime / duration) * 100;

  const videoId = player.getVideoData().video_id;
  const currentVideo = document.querySelector([data-video-id="${videoId}"]);

  if (percentageWatched >= watchedThreshold) {
    if (currentVideo && !currentVideo.classList.contains("completed")) {
      currentVideo.classList.add("completed");
      currentVideo.classList.remove("purple"); // Remove purple color if present
      currentVideo.classList.add("green"); // Mark as green
      completedTasks++;
      updateProgressBar();
    }
  }
}

function updateProgressBar() {
  const progressPercent = Math.floor((completedTasks / totalTasks) * 100);
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = progressPercent + "%";
  progressBar.textContent = progressPercent + "%";

  if (progressPercent === 100) {
    const quizLinkItem = document.getElementById("quizLinkItem");
    quizLinkItem.style.display = "block";
    document.getElementById("quizButton").classList.add("completed"); // Mark the button as green when progress is 100%
  }
}

// Load the quiz content dynamically when the quiz button is clicked
document
  .getElementById("quizButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Stop the video if it's playing
    // if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
    //   player.stopVideo();
    // }

    // // Stop the video playing animation
    // clearPlayingAnimation();

    // // Hide Previous and Next buttons
    // document.getElementById("prevVideo").style.display = "none";
    // document.getElementById("nextVideo").style.display = "none";
    // document.getElementById("startFromBeginning").style.display = "none";
    // document.getElementById("markAsComplete").style.display = "none";

    // Load quiz.html content into the player div
    // fetch("quiz.html")
    //   .then((response) => response.text())
    //   .then((data) => {
    //     document.getElementById("player").style.display = "none"; // Hide the player
    //     document.getElementById("quizContent").style.display = "block"; // Show quiz content
    //     document.getElementById("quizContent").innerHTML = data;
    //     quizMode = true; // Set quiz mode to true
    //   })
    //   .catch((error) => console.error("Error loading quiz:", error));
  });
document.getElementById("quizButton").addEventListener("click", function () {
  window.location.href = "yoga_quiz.html";
});

// Video link click logic
document.querySelectorAll("#videoList a").forEach((link) => {
  if (link.id !== "quizButton") {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default only for video links
      const videoId = this.getAttribute("data-video-id");
      const index = videoIds.indexOf(videoId);
      if (index !== -1) {
        // Reset quiz mode if a video link is clicked
        quizMode = false;
        document.getElementById("prevVideo").style.display = "block";
        document.getElementById("nextVideo").style.display = "block";

        // Show the player and hide the quiz content
        document.getElementById("player").style.display = "block";
        document.getElementById("quizContent").style.display = "none";

        changeVideo(index);

        // Mark the clicked link as purple only if it is not already completed (green)
        if (!this.classList.contains("completed")) {
          this.classList.add("purple");
        }
      }
    });
  }
});

document.getElementById("toggleSidebar").addEventListener("click", function () {
  const sidebar = document.querySelector(".sidebar");
  const content = document.querySelector(".content");

  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block";
    content.style.width = "80%";
    this.classList.remove("collapsed");
    this.innerHTML = "&#9654;"; // Right arrow
  } else {
    sidebar.style.display = "none";
    content.style.width = "100%";
    this.classList.add("collapsed");
    this.innerHTML = "&#9664;"; // Left arrow
  }
});

document.getElementById("exitButton").addEventListener("click", function () {
  window.location.href = "home.html";
});

document.getElementById("prevVideo").addEventListener("click", function () {
  if (currentVideoIndex > 0 && !quizMode) {
    changeVideo(currentVideoIndex - 1);
  }
});

document.getElementById("nextVideo").addEventListener("click", function () {
  if (currentVideoIndex < videoIds.length - 1 && !quizMode) {
    changeVideo(currentVideoIndex + 1);
  }
});

function updatePlayingAnimation() {
  clearPlayingAnimation();

  const videoId = videoIds[currentVideoIndex];
  const currentVideo = document.querySelector([data-video-id="${videoId}"]);

  if (currentVideo && !currentVideo.classList.contains("completed")) {
    currentVideo.classList.add("playing-animation");
    currentVideo.innerHTML += `
      <span class='playing-symbol'>
        <div class='bar bar-1'></div>
        <div class='bar bar-2'></div>
        <div class='bar bar-3'></div>
        <div class='bar bar-4'></div>
      </span>`;
  }
}

function clearPlayingAnimation() {
  document.querySelectorAll("#videoList li").forEach((item) => {
    item.classList.remove("playing-animation");
    const playingSymbol = item.querySelector(".playing-symbol");
    if (playingSymbol) {
      playingSymbol.remove();
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    checkVideoProgress();
    updatePlayingAnimation();
  } else if (
    event.data == YT.PlayerState.PAUSED ||
    event.data == YT.PlayerState.ENDED
  ) {
    clearPlayingAnimation(); // Stop the animation when video is paused or ended
  }
}

function updatePlayingAnimation() {
  clearPlayingAnimation();

  const videoId = videoIds[currentVideoIndex];
  const currentVideo = document.querySelector([data-video-id="${videoId}"]);

  if (currentVideo) {
    currentVideo.classList.add("playing-animation");
    if (!currentVideo.querySelector(".playing-symbol")) {
      currentVideo.innerHTML += `
        <span class='playing-symbol'>
          <div class='bar bar-1'></div>
          <div class='bar bar-2'></div>
          <div class='bar bar-3'></div>
          <div class='bar bar-4'></div>
        </span>`;
    }
  }
}

function clearPlayingAnimation() {
  document.querySelectorAll("#videoList li").forEach((item) => {
    item.classList.remove("playing-animation");
    const playingSymbol = item.querySelector(".playing-symbol");
    if (playingSymbol) {
      playingSymbol.remove();
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    checkVideoProgress();
    updatePlayingAnimation();
  } else if (
    event.data == YT.PlayerState.PAUSED ||
    event.data == YT.PlayerState.ENDED
  ) {
    clearPlayingAnimation(); // Stop the animation when video is paused or ended
  }
}

function checkVideoProgress() {
  if (!player) return;

  const currentTime = player.getCurrentTime();
  const duration = player.getDuration();
  const percentageWatched = (currentTime / duration) * 100;

  const videoId = player.getVideoData().video_id;
  const currentVideo = document.querySelector([data-video-id="${videoId}"]);

  if (
    percentageWatched >= watchedThreshold &&
    currentVideo &&
    !currentVideo.classList.contains("completed")
  ) {
    currentVideo.classList.add("completed");
    currentVideo.classList.remove("purple"); // Remove purple color if present
    currentVideo.classList.add("green"); // Add green color class
    completedTasks++;
    updateProgressBar();
  }
}

document
  .getElementById("startFromBeginning")
  .addEventListener("click", function () {
    // Reset the current video to the beginning
    player.seekTo(0);
    player.playVideo();
  });

document
  .getElementById("markAsComplete")
  .addEventListener("click", function () {
    const videoId = player.getVideoData().video_id;
    const currentVideo = document.querySelector([data-video-id="${videoId}"]);

    if (currentVideo && !currentVideo.classList.contains("completed")) {
      currentVideo.classList.add("completed");
      currentVideo.classList.remove("purple");
      currentVideo.style.color = "green"; // Mark as green
      completedTasks++;
      updateProgressBar();
    }
  });

document
  .getElementById("markAsComplete")
  .addEventListener("click", function () {
    // Reset the current video to the end
    let duration = player.getDuration();
    let endTime = duration - 1;
    player.seekTo(endTime);
    player.pauseVideo();
  });