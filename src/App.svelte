<script>
    import Header from './header/index.svelte';
    import Modal from './modal/index.svelte';

    export let items = [{title: '2/2 합시다', body: "블라블라블라블라블라블라블라블라블라블라", isFade: true}, {
        title: '다음달 하실 분들',
        body: "블라블라블라블라블라블라블라블라"
    }, {title: '모이자', body: "블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라"}];
    export let isFade = true;

    export const modal = {title: "default", body: "default"};
    export const addItem = ({title, body}) => {
        items = [...items, {title, body}]
    };
    export const showModal = (item) => {
        isFade = false;
        modal.title = item.title;
        modal.body = item.body;
        console.log(isFade)
    };

	export const closeModal = () => {
		isFade = true;
		console.log(isFade)
	};

	export const confirmModal = () => {
		console.log("some logic");
		closeModal();
	}
</script>

<Header/>
<main>
    <button>모집하기</button>
    <h1>현재 진행 중인 해커톤</h1>
    <ul>
        {#each items as item}
            <li on:click={showModal(item)}>{item.title}</li><br/>
        {/each}
    </ul>
	<Modal isFade={isFade} id={"modal"} title={modal.title} body={modal.body} ok="참가하기" closeFunction={closeModal} okFunction={confirmModal}/>
</main>

<style>
</style>
