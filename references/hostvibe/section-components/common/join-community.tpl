{assign var=section value=null}
{if isset($data) && is_array($data)}
    {assign var=section value=$data}
{/if}

{assign var=sectionId value='join-community-main'}
{if isset($section.sectionId) && $section.sectionId}{assign var=sectionId value=$section.sectionId}{/if}

<style>
    #{$sectionId} .bg-custom-dark {
    background-color: {if isset($section.backgroundColor) && $section.backgroundColor}{$section.backgroundColor}{else}var(--tg-theme-primary);{/if};
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    }

    #{$sectionId} .dot-img-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0.5;
    width: 150px;
    }

    #{$sectionId} .support-card {
    text-decoration: none;
    color: #212529;
    transition: transform 0.2s;
    }

    #{$sectionId} .support-card:hover {
    transform: translateY(-3px);
    color: var(--tg-theme-primary);

    }

    #{$sectionId} .sage-font {
    font-family: serif;
    }

    #{$sectionId} .join-community-title {
    max-width: 800px;
    line-height: 1.2;
    }

    #{$sectionId} .join-community-description {
    max-width: 700px;
    font-size: 0.95rem;
    line-height: 1.6;
    }

    #{$sectionId} .join-community-card-col {
    flex: 0 0 auto;
    width: 200px;
    }

    @media (max-width: 767.98px) {
    #{$sectionId} .join-community-card-col {
      width: 48%;
      min-width: 140px;
    }
    }

    @media (max-width: 420px) {
    #{$sectionId} .join-community-card-col {
      width: 100%;
    }
    }
</style>

<section id="{$sectionId}" class="py-5">
    <div class="container">
        <div class="bg-custom-dark p-4 p-md-5 text-center text-white">
            <img src="{if isset($section.dotImage) && $section.dotImage}{$section.dotImage}{else}https://namecadre.com/_next/image?url=%2Fassets%2Fimg%2Ficons%2Fdot.png&w=384&q=75{/if}"
                class="dot-img-overlay" alt="dots">

            <h1 class="sage-font display-6 fw-bold mb-4 px-lg-5 mx-auto text-white join-community-title">
                {if isset($section.title) && $section.title}
                    {$section.title}
                {else}
                    Need Help For Deciding or Looking Help For Technical Issue?
                {/if}
            </h1>

            <p class="mb-5 mx-auto text-white join-community-description">
                {if isset($section.description) && $section.description}
                    {$section.description}
                {else}
                    Talk to one of our hosting specialist who will review your needs and propose a tailored hosting solution
                    that will match your specific business reality and needs.
                {/if}
            </p>

            {if isset($section.cards) && $section.cards|@count gt 0}
                <div class="row g-3 justify-content-center">
                    {foreach from=$section.cards item=card}
                        <div class="col-6 col-md-4 col-lg-2 join-community-card-col">
                            {assign var=tag value='div'}
                            {if isset($card.url) && $card.url}
                                {assign var=tag value='a'}
                            {/if}
                            <{$tag} {if $tag == 'a'}href="{$card.url}" {/if}
                                {if isset($card.target) && $card.target}target="{$card.target}" {/if}
                                class="support-card bg-white rounded-3 p-3 d-flex align-items-center justify-content-center h-100 gap-2">
                                <img src="{if isset($card.icon) && $card.icon}{$card.icon}{else}https://namecadre.com/_next/image?url=%2Fassets%2Fimg%2Findex%2Fsupport-ticket.svg&w=128&q=75{/if}"
                                    width="35" height="35" alt="icon">
                                <span
                                    class="small fw-bold">{if isset($card.label) && $card.label}{$card.label}{else}Support{/if}</span>
                            </{$tag}>
                        </div>
                    {/foreach}
                </div>
            {/if}
        </div>
    </div>
</section>
