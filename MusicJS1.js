// Lưu trữ trạng thái của player
var isPlaying = false;
var iframeElement = null;
var currentMusicInfo = {};
var musicPlayerContainer = document.getElementById('musicPlayerContainer');
var musicInfo = document.getElementById('musicInfo');
var playPauseButton = document.getElementById('playPauseBtn');

// Hàm xử lý việc tải nhạc
function loadMusic() {
    spotifyLink = document.getElementById("spotifyLink").value; // Lấy link Spotify từ input
    if (spotifyLink) {
        const spotifyTrackId = getSpotifyTrackId(spotifyLink);
        const spotifyPlaylistId = getSpotifyPlaylistId(spotifyLink);
        const spotifyArtistId = getSpotifyArtistId(spotifyLink);

        if (spotifyTrackId) {
            // Nếu là track, nhúng player Spotify và lấy thông tin bài hát
            embedSpotifyPlayer("track", spotifyTrackId);
        } else if (spotifyPlaylistId) {
            // Nếu là playlist, nhúng player Spotify và lấy thông tin playlist
            embedSpotifyPlayer("playlist", spotifyPlaylistId);
        } else if (spotifyArtistId) {
            // Nếu là artist, nhúng player Spotify và lấy thông tin nghệ sĩ
            embedSpotifyPlayer("artist", spotifyArtistId);
        } else {
            alert("Link Spotify không hợp lệ.");
        }
    } else {
        alert("Vui lòng nhập link Spotify.");
    }
}

// Hàm để nhúng player Spotify vào trang
function embedSpotifyPlayer(type, id) {
    const spotifyEmbed = `<iframe src="https://open.spotify.com/embed/${type}/${id}" width="100%" height="80" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
    musicPlayerContainer.innerHTML = spotifyEmbed;

    // Tùy theo loại, lấy thêm thông tin chi tiết và hiển thị
    fetchSpotifyInfo(type, id);
}

// Hàm lấy thông tin từ Spotify (tên bài hát, nghệ sĩ, ảnh album, v.v.)
function fetchSpotifyInfo(type, id) {
    // Giả lập việc lấy thông tin chi tiết (ví dụ: sử dụng API Spotify nếu có)
    // Hiện tại chỉ giả lập thông tin với một số ví dụ cố định.
    switch (type) {
        case "track":
            currentMusicInfo = {
                name: "Shape of You",
                artist: "Ed Sheeran",
                album: "÷ (Divide)",
                cover: "https://i.scdn.co/image/ab67616d0000b273ed2d3b2ba1a3cd0d625d2706"
            };
            break;
        case "playlist":
            currentMusicInfo = {
                name: "Top Hits 2024",
                artist: "Various Artists",
                album: "Top Playlist",
                cover: "https://i.scdn.co/image/ab67616d0000b273e4b6f9cd1d92f70a7d3d1023"
            };
            break;
        case "artist":
            currentMusicInfo = {
                name: "Ed Sheeran",
                artist: "Ed Sheeran",
                album: "Various Albums",
                cover: "https://i.scdn.co/image/ab67616d0000b273e4b6f9cd1d92f70a7d3d1023"
            };
            break;
        default:
            currentMusicInfo = {};
    }

    // Hiển thị thông tin bài hát/playlist/artist
    displayMusicInfo();
}

// Hàm hiển thị thông tin nhạc
function displayMusicInfo() {
    musicInfo.innerHTML = `
        <h3>${currentMusicInfo.name}</h3>
        <p>Artist: ${currentMusicInfo.artist}</p>
        <p>Album: ${currentMusicInfo.album}</p>
        <img src="${currentMusicInfo.cover}" alt="${currentMusicInfo.name}" width="100">
    `;
}

// Hàm để trích xuất ID từ link Spotify
function getSpotifyTrackId(link) {
    const regex = /track\/([a-zA-Z0-9]+)/;
    const matches = link.match(regex);
    return matches ? matches[1] : null;
}

function getSpotifyPlaylistId(link) {
    const regex = /playlist\/([a-zA-Z0-9]+)/;
    const matches = link.match(regex);
    return matches ? matches[1] : null;
}

function getSpotifyArtistId(link) {
    const regex = /artist\/([a-zA-Z0-9]+)/;
    const matches = link.match(regex);
    return matches ? matches[1] : null;
}

// Hàm điều khiển Play/Pause (giả lập)
function togglePlayPause() {
    if (isPlaying) {
        // Nếu đang phát, pause player
        isPlaying = false;
        playPauseButton.textContent = "Play";
    } else {
        // Nếu dừng, play player
        isPlaying = true;
        playPauseButton.textContent = "Pause";
    }
}

// Hàm đổi link nhạc (thử nghiệm)
function changeMusicLink(newLink) {
    document.getElementById("spotifyLink").value = newLink;
    loadMusic(); // Load lại nhạc mới từ link mới
}

// Đảm bảo rằng nút Play/Pause được kích hoạt đúng
playPauseButton.addEventListener("click", togglePlayPause);
