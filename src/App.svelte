<script>
    import {convertToFormat} from './util'
    import Header from './header/index.svelte';
    import {hackathons} from './store'
    import Hackathon from "./cards/hackathon.svelte";

    export let modalHackathon = {
        id: "-1",
        title: "",
        body: "",
        currentTeamCount: -1,
        total: -1,
        createdAt: "",
        updatedAt: ""
    };

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

    export const setModalData = (hackathon) => {
        modalHackathon = hackathon;
    }
</script>

<Header/>
<div id="page">
    <div class="toasts"></div>
    <!--    <button on:click={showAddHackathonModal}>모집하기</button>-->
    <div class="footer-menu footer-menu-center-icon footer-3-icons">
        <a><i class="fa fa-gift"></i><span>Features</span></a>
        <a href="#" class="active-nav"><i class="fa fa-home"></i><span>Home</span></a>
        <a data-menu="menu-settings"><i class="fa fa-cog"></i><span>Settings</span></a>
        <div class="clear"></div>
    </div>

    <div class="page-content header-clear">
        <div class="page-title has-subtitle">
            <div class="page-title-left">
                <a href="#" class="font-20">현재 모집 중인 해커톤</a>
            </div>
            <div class="page-title-right">
            </div>
        </div>
        <div class="divider divider-margins"></div>
        {#each $hackathons as hackathon}
            <div data-menu={hackathon.id} on:click={setModalData(hackathon)}>
                <div data-menu="menu-instant-1" data-height="220"
                     class="caption caption-margins round-medium shadow-huge">
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
        {/each}
    </div>

    <div id={modalHackathon.id}
         class="menu-box menu-box-detached round-medium"
         data-menu-type="menu-box-bottom"
         data-menu-height="500"
         data-menu-effect="menu-parallax">
        <div class="page-title has-subtitle">
            <div class="page-title-left">
                <a href="#">{modalHackathon.title}</a>
                <span class="color-highlight">현재 참가한 팀 {modalHackathon.currentTeamCount} / {modalHackathon.total}</span>
            </div>
            <div class="page-title-right">
                <a href="#" class="close-menu"><i class="fa fa-times-circle font-20 color-red2-dark"></i></a>
            </div>
        </div>

        <div class="content bottom-0">
        <pre>
            {modalHackathon.body}
        </pre>
            <div class="close-menu button button-m round-small shadow-huge bg-green1-dark"
                 on:click={confirm(modalHackathon.id)} data-toast-manual-id="toast-manual-3">참가합니다
            </div>
            <div class="close-menu button button-m round-small shadow-huge bg-red1-dark">
                취소
            </div>
        </div>
    </div>


    <div class="menu-hider"></div>
</div>

<style>
</style>
