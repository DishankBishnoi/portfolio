document.addEventListener('DOMContentLoaded', function () {
    const menuT = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuT.addEventListener('click', function () {
        navLinks.classList.toggle('active');

        const icon = menuT.querySelector('i');

        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-x');
    });

    const counters = document.querySelectorAll(".counters .stat-number");
    const container = document.querySelector(".counters");
    let activated = false;

    window.addEventListener("scroll", () => {
        const pageOffset = window.pageYOffset;

        if (
            pageOffset > container.offsetTop - container.offsetHeight - 200 &&
            activated === false
        ) {
            counters.forEach(counter => {
                counter.innerText = 0;
                let count = 0;
                function updateCount() {
                    const target = parseInt(counter.dataset.count, 10);
                    const increment = Math.ceil(target / 100); // Smaller increment for slower animation
                    if (count < target) {
                        count += increment; // Increment by smaller steps
                        counter.innerText = Math.min(count, target); // Ensure it doesn't exceed the target
                        setTimeout(updateCount, 50); // Increase delay for slower updates
                    } else {
                        counter.innerText = target;
                    }
                }
                updateCount();
                activated = true;
            });
        } else if (
            (pageOffset < container.offsetTop - container.offsetHeight - 500 ||
                pageOffset === 0) &&
            activated === true
        ) {
            counters.forEach(counter => {
                counter.innerText = 0;
            });
            activated = false;
        }
    });

    const skillsSection = document.querySelector('.skills-section');
    const skillsBars = document.querySelectorAll('.skill-progress');
    const percentNumber = document.querySelectorAll('.percent-number');

    let skillAnimated = false;
    
    function animateSkills(){
        if(skillAnimated) return;

        skillsBars.forEach((bar,index)=>{
            const percent = parseInt(bar.getAttribute('data-percent'));
            bar.style.width = percent + '%';
            
            let currentPercent = 0;
            const updateCounter =setInterval(()=>{
                if(currentPercent<percent){
                    currentPercent++;
                    percentNumber[index].textContent = currentPercent;

                }
                else{
                    clearInterval(updateCounter);
                }
            },20);
        });
        skillAnimated = true;
    }
    const observerOption = {
        root:null,
        rootMargin:'0px',
        threshold:0.5,
    }
    const  skillObserver = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                animateSkills();
                skillObserver(entry.target);
            }
        });
    },observerOption)

    skillObserver.observe(skillsSection);
    
    
    AOS.init();
});
