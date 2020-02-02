<script>
    import {hackathons} from '../store'

    export let isFade;
    export let target;
    export let id;

    export let closeFunction;

    export const close = () => {
        closeFunction();
    };
    export const confirm = (id) => {
        addCurrentTeamCount(id);
        closeFunction();
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

<!-- Modal -->
{#if !isFade}
    <modal>
        <div id={id} class="searchModal">
            <div class="search-modal-content">
                <div class="page-header">
                    <h1>{target.title}</h1>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-12">
                                <pre>{target.body}</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={close}>닫기
                    </button>
                    <button type="button" class="btn btn-primary"
                            on:click={confirm(target.id)}>참가하기
                    </button>
                </div>
            </div>
        </div>
    </modal>
{/if}

<style>
    /* The Modal (background) */
    .searchModal {
        position: fixed; /* Stay in place */
        z-index: 10; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    }

    /* Modal Content/Box */
    .search-modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 1000px; /* Could be more or less, depending on screen size */
    }
</style>
