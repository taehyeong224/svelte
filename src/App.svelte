<script>
    import Header from './header/index.svelte';
    import { hackathons } from './store'
    import Hackathon from "./cards/hackathon.svelte";

</script>

<Header/>
<main id="page">
<!--    <button on:click={showAddHackathonModal}>모집하기</button>-->

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
            <Hackathon id={hackathon.id} hackathon={hackathon}/>
        {/each}
    </div>

    <div class="footer-menu footer-menu-center-icon footer-3-icons">
        <a><i class="fa fa-gift"></i><span>Features</span></a>
        <a href="#" class="active-nav"><i class="fa fa-home"></i><span>Home</span></a>
        <a data-menu="menu-settings"><i class="fa fa-cog"></i><span>Settings</span></a>
        <div class="clear"></div>
    </div>
</main>

<style>
</style>
