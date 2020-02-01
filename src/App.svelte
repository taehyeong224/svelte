<script>
    import {convertToFormat, getCurrentTimestamp} from './util'
    import Header from './header/index.svelte';
    import Modal from './modal/showHackathonModal.svelte';
    import AddHackathonModal from './modal/addHackathonModal.svelte';
    import { hackathons } from './store'

    export let isFade = true;
    export let isAddHackathonModalFade = true;
    export const modal = {
        id: "-1", title: "default", body: "default", total: 10, currentMemberCount: 1, createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp()
    };

    export const setModalToDefault = () => {
        modal.id = "-1";
        modal.title = "default";
        modal.body = "default";
        modal.total = 10;
        modal.currentMemberCount = "default";
        modal.createdAt = getCurrentTimestamp();
        modal.updatedAt = getCurrentTimestamp();
    };

    export const showAddModal = () => {
        setModalToDefault();
        showModal(modal);
    };

    export const showModal = (item) => {
        isFade = false;
        modal.id = item.id;
        modal.title = item.title;
        modal.body = getModalInfoString(item);
        modal.total = item.total;
        modal.currentMemberCount = item.currentMemberCount;
    };

    export const showAddHackathonModal = () => {
        isAddHackathonModalFade = false;
        setModalToDefault();
    };

    const getModalInfoString = (item) => {
        return `
        총 모집 인원: ${item.total}\n

        생성일: ${convertToFormat(item.createdAt)}

        수정일: ${convertToFormat(item.updatedAt)}

        내용: ${item.body}
      `
    };

    export const closeModal = () => {
        isFade = true;
    };

    export const closeAddHackathonModal = () => {
        isAddHackathonModalFade = true;
    };
</script>

<Header/>
<main>
    <button on:click={showAddHackathonModal}>모집하기</button>
    <h1>현재 진행 중인 해커톤</h1>
    <ul>
        {#each $hackathons as hackathon}
            <li on:click={showModal(hackathon)}>{hackathon.title} | {hackathon.currentMemberCount} / {hackathon.total}</li>
            <br/>
        {/each}
    </ul>
    <Modal isFade={isFade} id={"modal"} target={modal} closeFunction={closeModal}/>
    <AddHackathonModal isFade={isAddHackathonModalFade} id={"modal"} title={modal.title} body={modal.body} closeFunction={closeAddHackathonModal}/>
</main>

<style>
</style>
