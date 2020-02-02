<script>
    import {hackathons} from '../store'

    export let isFade = true;
    $: console.log("isFade : ", isFade);
    export let target;
    export let id;

    export const close = () => {
        isFade = true;
    };
    export const confirm = (id) => {
        addCurrentTeamCount(id);
        close();
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

    export const showModal = () => {
        console.log("showModal");
        isFade = false;
    };
</script>
{#if !isFade}
    <div id="action-age"
         on:click={showModal}
         class="menu-box round-medium"
         data-menu-type="menu-box-modal"
         data-menu-height="340"
         data-menu-width="300">
        <div class="page-title has-subtitle">
            <div class="page-title-left">
                <a href="#">Welcome</a>
                <span class="color-highlight">{target.title}</span>
            </div>
            <div class="page-title-right">
                <a href="#" class="close-menu"><i class="fa fa-times-circle font-20 color-red2-dark"></i></a>
            </div>
        </div>

        <div class="content bottom-0">
        <pre>
            {target.body}
        </pre>
            <div class="close-menu button button-full button-m round-small shadow-huge bg-green1-dark"
                 on:click={confirm(target.id)}>참가합니다
            </div>
            <div class="close-menu button button-full button-m round-small shadow-huge bg-red1-dark" on:click={close}>
                취소
            </div>
        </div>
    </div>
{/if}
