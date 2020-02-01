<script>
    import Header from './header/index.svelte';
    import Modal from './modal/index.svelte';

    export let items = [
        {
            id: "-x!@#!@#1",
            title: '2/2 합시다',
            body: "블라블라블라블라블라블라블라블라블라블라",
            isFade: true,
            total: 10,
            currentMemberCount: 1
        },
        {id: "-x!@#!@#2", title: '다음달 하실 분들', body: "블라블라블라블라블라블라블라블라", total: 10, currentMemberCount: 1},
        {id: "-x!@#!@#3", title: '모이자', body: "블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라", total: 10, currentMemberCount: 1}];
    export let isFade = true;

    export const modal = {id: "-1", title: "default", body: "default"};
    export const addItem = ({title, body}) => {
        items = [...items, {title, body}]
    };
    export const showModal = (item) => {
        isFade = false;
        modal.id = item.id;
        modal.title = item.title;
        modal.body = item.body;
    };

    export const closeModal = () => {
        isFade = true;
    };

    export const confirmModal = () => {
        console.log("some logic : ", modal.id);
        addCurrentMemberCount(modal.id);
        closeModal();
    };

    export const addCurrentMemberCount = (id) => {
        items = items.map(item => {
            if (item.id === id) {
                item.currentMemberCount++;
                if (item.total < item.currentMemberCount) {
                  throw new Error("total < currentMemberCount")
                }
            }
            return item;
        })
    };
</script>

<Header/>
<main>
    <button>모집하기</button>
    <h1>현재 진행 중인 해커톤</h1>
    <ul>
        {#each items as item}
            <li on:click={showModal(item)}>{item.title} | {item.currentMemberCount} / {item.total}</li>
            <br/>
        {/each}
    </ul>
    <Modal isFade={isFade} id={"modal"} title={modal.title} body={modal.body} ok="참가하기" closeFunction={closeModal}
           okFunction={confirmModal}/>
</main>

<style>
</style>
