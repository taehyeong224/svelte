<script>
    import {convertToFormat} from "../util"
    import {hackathons} from '../store'

    export let hackathon;
    export let id;

    export const confirm = (id) => {
        addCurrentTeamCount(id);
    };

    const addCurrentTeamCount = (id) => {
        const target = hackathons.getOne(id);
        if (!target) {
            throw Error(`${id} not found`);
        }
        target.currentTeamCount += 1;
        if (target.total < target.currentTeamCount) {
            alert('현재 참가한 팀이 꽉 찼습니다.');
            console.error(`${id}'s ${target.total} < ${target.currentTeamCount}`);
            return;
        }
        hackathons.update(target);
    };
</script>

<div class="toasts">
    <div class="toast toast-top" id="toast-manual-3">
        <p class="color-white"><i class='fa fa-check right-10'></i> 참여하였습니다 </p>
        <div class="toast-bg bg-green1-dark"></div>
    </div>
</div>
<div data-menu={id}>
    <div data-menu="menu-instant-1" data-height="220" class="caption caption-margins round-medium shadow-huge">
        <div class="caption-top left-15 top-15">
            <div class="caption-author-left">
                <strong>참여가능</strong>
                <span>{convertToFormat(hackathon.createdAt)} 생성</span>
            </div>
        </div>

        <div class="caption-top right-text top-10 right-15">
            <span class="color-white ultrabold font-9">TAP TO VIEW</span>
        </div>

        <div class="caption-bottom left-20 bottom-20">
            <p class="color-white opacity-70 bottom-0 font-12">현재 참가 팀 {hackathon.currentTeamCount}
                / {hackathon.total}</p>
            <h1 class="color-white bolder font-32">{hackathon.title}</h1>
        </div>
        <div class="caption-overlay bg-black opacity-70"></div>
        <div class="caption-bg bg-11"></div>
    </div>
</div>

<div id={id}
     class="menu-box round-medium"
     data-menu-type="menu-box-modal"
     data-menu-height="340"
     data-menu-width="300">
    <div class="page-title has-subtitle">
        <div class="page-title-left">
            <a href="#">{hackathon.title}</a>
            <span class="color-highlight">현재 참가한 팀 {hackathon.currentTeamCount} / {hackathon.total}</span>
        </div>
        <div class="page-title-right">
            <a href="#" class="close-menu"><i class="fa fa-times-circle font-20 color-red2-dark"></i></a>
        </div>
    </div>

    <div class="content bottom-0">
        <pre>
            {hackathon.body}
        </pre>
        <div class="close-menu button button-full button-m round-small shadow-huge bg-green1-dark"
             on:click={confirm(hackathon.id)}>참가합니다
        </div>
        <div class="close-menu button button-full button-m round-small shadow-huge bg-red1-dark">
            취소
        </div>
    </div>
</div>
