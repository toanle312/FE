

function createMusicApp(){
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)
    
    const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'
    
    const playlist = $('.playlist')
    const cd = $('.cd')
    const heading = $('.header h2')
    const cdThumb = $('.cd-thumbnail')
    const audio = $('#audio')
    const playBtn = $('.btn-toggle-play')
    const main = $('.main')
    const progress = $('#progress')
    const playList = $('.playlist')
    const prevBtn = $('.btn-prev')
    const nextBtn = $('.btn-next')
    const randomBtn = $('.btn-random')
    const repeatBtn = $('.btn-repeat')
    const volumeBtn = $('.btn-toggle-volume')
    const volume  = $('.volume')
    const volumeBar = $('#volumeBar')

    const app = {
        indexSongs: [],
        currentIndex: 0,
        currentVolume: 1,
        isPlaying: false,
        isRandom: false,
        isRepeat: false,
        isMute: false,
        configs: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
        setConfigs: function(key, value) {
            this.configs[key] = value;
            localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.configs));
        },
        // Tên các bài hát
        songs: [
            {
                name: "Nấu Ăn Cho Em",
                singer: "Đen x PiaLinh",
                path: "./assets/music/NauAnChoEm-Den-9466587.mp3",
                image: "https://th.bing.com/th?id=OIF.w%2bmcdc0DHxAtnGRwYrN%2fsQ&w=323&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            },
            {
                name: "Không Thể Say",
                singer: "HIEUTHUHAI",
                path: "./assets/music/KhongTheSay-HIEUTHUHAI-9293024.mp3",
                image:
                "https://th.bing.com/th/id/R.03dd8a8fdbbf3ce95c32f7b773402197?rik=uUa8KHRcl5unqw&pid=ImgRaw&r=0"
            },
            {
                name: "Thân Mật",
                singer: "Gill x Uyennhi x Kewtiie",
                path:
                "assets/music/ThanMat-GillUyennhiKewtiie-8356710.mp3",
                image: "https://i.ytimg.com/vi/2f3YZJbOf2c/maxresdefault.jpg"
            },
            {
                name: "Dỗi Ít Thôi Ôm Đê",
                singer: "Phúc Du x AMEE",
                path: "./assets/music/DoiItThoiOmDe-PhucDuAMEE-8343857.mp3",
                image:
                "https://th.bing.com/th/id/OIP.85xByCq0DS-IeWty5eSnOAHaD4?w=310&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            },
            {
                name: "Ngủ Một Mình",
                singer: "HIEUTHUHAI x Negav x Kewtiie",
                path: "./assets/music/NguMotMinh-HIEUTHUHAINegavKewtiie-8267763.mp3",
                image:
                "https://th.bing.com/th/id/OIP.PA8hfqpDbp41jyKRgfk9vwHaEK?w=279&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            },
            {
                name: "Điều Tồi Tệ Của Em",
                singer: "Khói",
                path:
                "assets/music/DieuToiTeCuaEm-Khoi-8105443.mp3",
                image:
                "https://th.bing.com/th/id/OIP.SA8TqmBuosWpIwkCJed5oQHaHa?w=169&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            },
            {
                name: "Đêm Trắng",
                singer: "NAMVEE",
                path: "./assets/music/DemTrang-NAMVEE-8342746.mp3",
                image:
                "https://th.bing.com/th/id/OIP.SA8TqmBuosWpIwkCJed5oQHaHa?w=169&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                
            },
            {
                name: "Ưng Quá Chừng",
                singer: "AMEE",
                path: "./assets/music/UngQuaChung-AMEE-8783624.mp3",
                image:
                "https://th.bing.com/th/id/OIP.u3gwJ3TA4CJJ4ZrW3jq9AQHaHa?w=199&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            },
            {
                name: "Yêu Anh Đi Mẹ Anh Bán Bánh Mì",
                singer: "Phúc Du",
                path: "./assets/music/YeuAnhDiMeAnhBanBanhMi-PhucDu-8698703.mp3",
                image:
                "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/a/b/5/cab580d530e8b512605c9a0f07eb43b5.jpg"
                
            },
            {
                name: "Rồi Ta Sẽ Ngắm Pháo Hoa Cùng Nhau",
                singer: "O.lew",
                path: "./assets/music/RoiTaSeNgamPhaoHoaCungNhau-OlewVietNam-8485329.mp3",
                image:
                "https://th.bing.com/th/id/OIP.C2PhFXWyRBAY-9p5wUp4SQAAAA?w=312&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                
            },
            {
                name: "Cụp Cái Pha Xuống",
                singer: "Willistic",
                path: "./assets/music/CUPCAIPHAXUONG-Willistic-9472136.mp3",
                image:
                "https://th.bing.com/th/id/OIP.jez5ORlnEAsMvPG24zhAEwHaLH?w=123&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                
            }
            
            
        ],
        
        // Định nghĩa thuộc tính
    
        // currentSong lấy ra bài hát tại current index trong mảng index song
        // Nếu không có tính năng random thì indexSongs tại currentIndex = bài hát tại chính index của nó
        // còn nếu có tính năng random thì indexSongs tại currentIndex là bài hát tại index khác
        defineProperties: function(){
            Object.defineProperty(this, 'currentSong', {
                get: function(){
                    return this.songs[this.indexSongs[this.currentIndex]];
                }
            })
        },
    
        // Hàm render tất cả bài hát
        render: function() {  
            const htmls = this.songs.map(
                (song, index) => {
                    // ${this.currentIndex === index ? 'active' : ''}
                return `<div class="song" data-index=${index}>
                    <div class="thumb" style="background-image: url(${song.image})"></div>
                    <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`;
                }
            )
            playlist.innerHTML = htmls.join('');
        },
    
        // Hàm xử lý sự kiện
        handleEvents: function(){
            const _this = this;
            const cdWidth = cd.offsetWidth;
    
            // Xử lý đĩa quay
            
            // hàm animate trả về một đối tượng Animation
            const cdThumbAnimation = cdThumb.animate(
            [
                { transform: 'rotate(360deg)' }
            ], {
                duration: 20000,
                iterations: Infinity
            });
            cdThumbAnimation.pause();
    
    
            // Lắng nghe sự kiện scrolling
            document.onscroll = function() {
                const scrollTop = window.screenY || document.documentElement.scrollTop
                
                const newCdWidth = cdWidth - scrollTop
    
                cd.style.width = newCdWidth > 0 ? newCdWidth +'px' : 0
                cd.style.opacity = newCdWidth / cdWidth;
            }
    
            // Khi bấm nút chơi nhạc
            playBtn.onclick = function(){
                if(_this.isPlaying) {
                    audio.pause();
                }
                else{
                    audio.play();
                }
            }
    
            // Khi bấm nút âm lượng
            volumeBtn.onclick = function(){
                // nếu bài hát đang mute thì unmute
                if(_this.isMute) {
                    audio.volume = _this.currentVolume;
                }
                // nếu bài hát đang unmute thì mute
                else{
                    audio.volume = 0;
                }
    
                _this.setConfigs('isMute', _this.isMute);
            }
    
            // Khi âm lượng thay đổi => thêm hàm mute và gỡ hàm mute
            audio.onvolumechange = function(){
                // Khi âm lượng bằng 0 => tức là bài hát mute
                if(audio.volume === 0){
                    volume.classList.add('mute');
                    _this.isMute = true;
                }
                // Khi âm lượng != 0 => tức là bài hát unmute
                else
                {
                    volume.classList.remove('mute');
                    _this.isMute = false;
    
                    // Cập nhật thanh âm lượng khi âm lượng bài hát thay đổi
                    volumeBar.value = _this.currentVolume * 100;
                }
    
                _this.setConfigs('volumeBar', volumeBar.value);
                _this.setConfigs('isMute', _this.isMute);
            }
    
            // Khi thanh âm lượng thay đổi => âm lượng thay đổi
            volumeBar.oninput = function(){
                const volumeChange = volumeBar.value / 100;
    
                // Khi bài hát mute, nếu âm lượng nhỏ hơn âm lượng hiện tại thì không unmute
                if(volumeChange < _this.currentVolume && _this.isMute) {
                    audio.volume = 0;
                }
                // Các trường hợp còn lại đều được unmute
                else {
                    audio.volume = volumeChange;
                }
    
                // Cập nhật lại âm lượng hiện tại sau mỗi lần thay đổi
                _this.currentVolume = volumeChange;
    
            }
    
            // Khi nhạc chạy
            audio.onplay = function(){
                main.classList.add('playing');
                _this.isPlaying = true;
                cdThumbAnimation.play();
            }
    
            // Khi nhạc dừng
            audio.onpause = function(){
                main.classList.remove('playing');
                _this.isPlaying = false;
                cdThumbAnimation.pause();
            }
    
            // Khi tiến độ bài nhạc thay đổi
            audio.ontimeupdate = function(){
                if(audio.duration){
                const progressPercent = (audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
                }
            }
    
            audio.onended = function(){
                if(_this.isRepeat)
                {
                    audio.play();
                }
                else{
                    nextBtn.click();
                }
            }
    
            progress.oninput = function(){
                const seekTimes = (this.value * audio.duration / 100);
                audio.currentTime = seekTimes;
            }
    
            playList.onclick = function(e){
    
                // e.target -> đối tượng cuối cùng chúng ta click chuột
                // closest -> tìm cha hoặc con gần nhất ứng với CSS selector query
                const songElement = e.target.closest('.song:not(.active)');
                if(songElement || e.target.closest('.option')){
                    if(songElement){
                        // $('.song.active').classList.remove('active');
            
                        // songElement.classList.add('active');
                        
                        // _this.currentIndex = songElement.getAttribute('data-index');
                        // Khi đặt data-... ta có thể sử dụng dataset như sau
                        _this.currentIndex = _this.indexSongs.indexOf(Number(songElement.dataset.index));
                        _this.loadCurrentSong();
                        _this.loadActiveSong();
                        audio.play();
                    }
                    
                }
            }
    
            nextBtn.onclick = function(){
                _this.nextSong();
                _this.loadActiveSong();
                _this.scrollActiveSong();
                audio.play();
            }
    
            prevBtn.onclick = function(){
                _this.prevSong();
                _this.loadActiveSong();
                _this.scrollActiveSong();
                audio.play();
            }
    
            randomBtn.onclick = function(){
                _this.isRandom = !_this.isRandom;
                _this.setConfigs('isRandom', _this.isRandom);
                this.classList.toggle('active', _this.isRandom);
                if(_this.isRandom){
                    // Nếu active tính năng random thì load indexSongs mới và lấy currentIndex mới trong mảng indexSongs 
                    // từ bài hát hiện tại
                    _this.loadIndexSongs();
                    _this.currentIndex = _this.indexSongs.indexOf(_this.currentIndex);
                }
                else{
                    // Nếu không active tính năng random thì lấy bài hát hiện tại trong mảng indexSongs 
                    // tại vị trí currentIndex rồi load lại indexSongs
                    _this.currentIndex = _this.indexSongs[_this.currentIndex];
                    _this.loadIndexSongs();
                }
            }
    
            repeatBtn.onclick = function(){
                _this.isRepeat = !_this.isRepeat;
                _this.setConfigs('isRepeat', _this.isRepeat);   
                this.classList.toggle('active', _this.isRepeat);
            }
    
        },
    
        // Chuyển view đến bài hát được active
        scrollActiveSong: function(){
            if(
                $('.song:nth-child(1)').classList.contains('active') ||
                $('.song:nth-child(2)').classList.contains('active') ||
                $('.song:nth-child(3)').classList.contains('active') ||
                $('.song:nth-child(4)').classList.contains('active')
    
            ){
                $('.song.active').scrollIntoView(
                    {
                        behavior:'smooth',
                        block: 'end',
                    }
                )
            }
            else{
                $('.song.active').scrollIntoView(
                    {
                        behavior:'smooth',
                        block: 'center',
                    }
                )
            }
        },
    
        // Active bài hát khi chạy nhạc
        loadActiveSong: function(){
            let songList = $$('.song');
            [...songList].forEach(
                (song, index) => {
                    // Do vị trí các bài hát thay đổi nên phải xét vị trí mới của bài hát hiện tại 
                    //(index có thể hiểu là bài hát hiện tại)
                    if(this.currentIndex === this.indexSongs.indexOf(index)) {
                        song.classList.add('active');
                        this.setConfigs('currentIndex', index);
                    }
                    else{
                        if(song.classList.contains('active')){
                            song.classList.remove('active');
                        }
                    }
                }
            )
        },
    
        loadCurrentSong: function(){
            heading.textContent = this.currentSong.name;
            cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
            audio.src = this.currentSong.path;
        },
    
        loadConfigs: function(){
            this.isRandom = this.configs.isRandom === undefined ? false : this.configs.isRandom;
            this.isRepeat = this.configs.isRepeat === undefined ? false : this.configs.isRepeat;
            this.currentIndex = this.configs.currentIndex;
    
            // Progress bar mà có giá trị undefined => mặc định là 50
            this.currentVolume = this.configs.volumeBar === undefined ? 1 : this.configs.volumeBar / 100;
            volumeBar.value = this.currentVolume * 100;
            audio.volume = this.currentVolume;
        },
    
        nextSong: function(){
            this.currentIndex++;
    
            if(this.currentIndex >= this.songs.length){
                this.currentIndex = 0;
            }
    
            this.loadCurrentSong();
        },
    
        prevSong:function(){
            this.currentIndex--;
    
            if(this.currentIndex < 0){
                this.currentIndex = this.songs.length - 1;
            }
    
            this.loadCurrentSong();
        },
    
        // Tạo ra một mảng chứa các index của bài hát đã được xáo trộn
        randomSong: function(){
            let randomIndex;
    
            for(let i in this.songs){
                do{
                    randomIndex = Math.floor(Math.random() * this.songs.length);
                }
                while(this.indexSongs.includes(randomIndex));
                this.indexSongs.push(randomIndex);
            }
        },
    
        // Load mảng index bài hát
        // Nếu có tính năng random thì xáo trộn index nếu không thì giữ theo thứ tự
        loadIndexSongs: function(){
            this.indexSongs = [];
            if(this.isRandom)
            {
                this.randomSong();
            }
            else{
                for(let i in this.songs){
                    this.indexSongs.push(Number.parseInt(i));
                }
            }
            this.currentIndex = this.indexSongs.indexOf(this.currentIndex);
        },
    
        start: function() {
            // Định nghĩa các thuộc tính cho Object
            this.defineProperties();
            
            // Load configs
            if(Object.keys(this.configs).length){
                this.loadConfigs();
    
                console.log(this.isRandom)
                console.log(this.isRepeat)
        
                randomBtn.classList.toggle('active', this.isRandom);
                repeatBtn.classList.toggle('active', this.isRepeat);
    
                volume.classList.toggle('mute', volumeBar.value == 0); 
            }
    
            // Tải vị trí hiện tại của bài hát
            this.loadIndexSongs();
            
            // Tải thông tin bài hát đầu tiên
            this.loadCurrentSong();
            
            // Lắng nghe xử lý các sự kiện (DOM Event)
            this.handleEvents();
            
            
            // Render Playlist
            this.render();
            
            // Tải các bài hát được active
            this.loadActiveSong();
            
            this.scrollActiveSong();
            
    
        },
    
    }

    return app;
}
const app = createMusicApp();
app.start();
