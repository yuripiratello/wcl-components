let getComponent;(()=>{"use strict";var e={d:(s,a)=>{for(var l in a)e.o(a,l)&&!e.o(s,l)&&Object.defineProperty(s,l,{enumerable:!0,get:a[l]})},o:(e,s)=>Object.prototype.hasOwnProperty.call(e,s)},s={};e.d(s,{default:()=>h});const a=[{class:"Death Knight",defensives:[{spellId:48743,name:"Death Pact",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:49039,name:"Lichborne",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:48792,name:"Icebound Fortitude",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:51052,name:"Anti-Magic Zone",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:48707,name:"Anti-Magic Shell",baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:49998,name:"Death Strike",baseCd:0,cdReduction:!1,charges:!1,spec:null}]},{class:"Demon Hunter",defensives:[{spellId:196718,name:"Darkness",baseCd:3e5,cdReduction:!0,charges:!1,spec:null},{spellId:196555,name:"Netherwalk",baseCd:18e4,cdReduction:!1,charges:!1,spec:"Havoc"},{spellId:198589,name:"Blur",baseCd:6e4,cdReduction:!1,charges:!1,spec:"Havoc"}]},{class:"Druid",defensives:[{spellId:319454,name:"Heart of the Wild",baseCd:3e5,cdReduction:!1,charges:!1,spec:null},{spellId:108238,name:"Renewal",baseCd:9e4,cdReduction:!1,charges:!1,spec:null},{spellId:124974,name:"Nature's Vigil",baseCd:9e4,cdReduction:!1,charges:!1,spec:null},{spellId:22812,name:"Barkskin",baseCd:6e4,cdReduction:!1,charges:!1,spec:null},{spellId:22842,name:"Frenzied Regeneration",baseCd:36e3,cdReduction:!0,charges:!1,spec:null},{spellId:5487,name:"Bear Form",baseCd:0,cdReduction:!1,charges:!1,spec:null},{spellId:61336,name:"Feral Instincts",baseCd:18e4,cdReduction:!1,charges:!1,spec:"Feral"}]},{class:"Evoker",defensives:[{spellId:374227,name:"Zephyr",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:363916,name:"Obsidian Scales",baseCd:9e4,cdReduction:!0,charges:!0,spec:null},{spellId:374348,name:"Renewing Blaze",baseCd:9e4,cdReduction:!0,charges:!1,spec:null},{spellId:360827,name:"Blistering Scales",baseCd:3e4,cdReduction:!1,charges:!1,spec:"Augmentation"}]},{class:"Hunter",defensives:[{spellId:186265,name:"Aspect of the Turtle",baseCd:18e4,cdReduction:!0,charges:!1,spec:null},{spellId:109304,name:"Exhilaration",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:264735,name:"Survival of the Fittest",baseCd:12e4,cdReduction:!0,charges:!0,spec:null},{spellId:388035,name:"Fortitude of the Bear",baseCd:12e4,cdReduction:!1,charges:!1,spec:null}]},{class:"Mage",defensives:[{spellId:414658,name:"Ice Cold",baseCd:24e4,cdReduction:!0,charges:!1,spec:null},{spellId:45438,name:"Ice Block",baseCd:24e4,cdReduction:!0,charges:!1,spec:null},{spellId:55342,name:"Mirror Image",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:110960,name:"Greater Invisibility",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:414660,name:"Mass Barrier",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:342245,name:"Alter Time",baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:342247,name:"Alter Time",baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:235450,name:"Prismatic Barrier",baseCd:25e3,cdReduction:!1,charges:!1,spec:"Arcane"},{spellId:235313,name:"Blazing Barrier",baseCd:25e3,cdReduction:!1,charges:!1,spec:"Fire"},{spellId:235219,name:"Cold Snap",baseCd:3e5,cdReduction:!1,charges:!1,spec:"Frost"},{spellId:11426,name:"Frost Barrier",baseCd:25e3,cdReduction:!1,charges:!1,spec:"Frost"}]},{class:"Monk",defensives:[{spellId:115203,name:"Fortifying Brew",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:122783,name:"Diffuse Magic",baseCd:9e4,cdReduction:!1,charges:!1,spec:null},{spellId:122470,name:"Touch of Karma",baseCd:9e4,cdReduction:!1,charges:!1,spec:"Windwalker"}]},{class:"Paladin",defensives:[{spellId:471195,name:"Lay on Hands",baseCd:6e5,cdReduction:!0,charges:!1,spec:null},{spellId:1022,name:"Blessing of Protection",baseCd:3e5,cdReduction:!0,charges:!1,spec:null},{spellId:642,name:"Divine Shield",baseCd:3e5,cdReduction:!0,charges:!1,spec:null},{spellId:6940,name:"Blessing of Sacrifice",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:498,name:"Divine Protection",baseCd:9e4,cdReduction:!0,charges:!1,spec:"Holy"},{spellId:403876,name:"Divine Protection",baseCd:9e4,cdReduction:!0,charges:!1,spec:"Retribution"},{spellId:184662,name:"Shield of Vengeance",baseCd:9e4,cdReduction:!1,charges:!1,spec:"Retribution"}]},{class:"Priest",defensives:[{spellId:108968,name:"Void Shift",baseCd:3e5,cdReduction:!1,charges:!1,spec:null},{spellId:15286,name:"Vampiric Embrace",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:19236,name:"Desperate Prayer",baseCd:9e4,cdReduction:!0,charges:!1,spec:null},{spellId:586,name:"Fade",baseCd:3e4,cdReduction:!0,charges:!1,spec:null},{spellId:47585,name:"Dispersion",baseCd:12e4,cdReduction:!1,charges:!1,spec:"Shadow"}]},{class:"Rogue",defensives:[{spellId:5277,name:"Evasion",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:31224,name:"Cloak of Shadows",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:185311,name:"Crimson Vial",baseCd:3e4,cdReduction:!1,charges:!1,spec:null},{spellId:1966,name:"Feint",baseCd:15e3,cdReduction:!0,charges:!0,spec:null}]},{class:"Shaman",defensives:[{spellId:198103,name:"Earth Elemental",baseCd:3e5,cdReduction:!1,charges:!1,spec:null},{spellId:108271,name:"Astral Shift",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:108281,name:"Ancestral Guidance",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:108270,name:"Stone Bulwark Totem",baseCd:12e4,cdReduction:!0,charges:!1,spec:null}]},{class:"Warlock",defensives:[{spellId:104773,name:"Unending Resolve",baseCd:18e4,cdReduction:!0,charges:!1,spec:null},{spellId:108416,name:"Dark Pact",baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:452930,name:"Demonic Healthstone",baseCd:6e4,cdReduction:!1,charges:!1,spec:null},{spellId:6789,name:"Mortal Coil",baseCd:45e3,cdReduction:!1,charges:!1,spec:null},{spellId:234153,name:"Drain Life",baseCd:0,cdReduction:!1,charges:!1,spec:null}]},{class:"Warrior",defensives:[{spellId:383762,name:"Bitter Immunity",baseCd:18e4,cdReduction:!1,charges:!1,spec:null},{spellId:97462,name:"Rallying Cry",baseCd:18e4,cdReduction:!1,charges:!1,spec:null},{spellId:202168,name:"Impending Victory",baseCd:25e3,cdReduction:!1,charges:!1,spec:null},{spellId:23920,name:"Spell Reflection",baseCd:25e3,cdReduction:!0,charges:!1,spec:null},{spellId:386208,name:"Defensive Stance",baseCd:3e3,cdReduction:!1,charges:!1,spec:null},{spellId:118038,name:"Die by the Sword",baseCd:12e4,cdReduction:!0,charges:!1,spec:"Arms"},{spellId:190456,name:"Ignore Pain",baseCd:11e3,cdReduction:!1,charges:!1,spec:"Arms"},{spellId:184364,name:"Enraged Regeneration",baseCd:12e4,cdReduction:!0,charges:!1,spec:"Fury"}]},{class:"Everyone",defensives:[{spellId:6262,name:"Healthstone",baseCd:0,cdReduction:!1,charges:!1,spec:null},{spellId:431416,name:"Algari Healing Potion",baseCd:3e5,cdReduction:!1,charges:!1,spec:null}]}],l=!1,n=1e4,t=(e,s,l)=>{var n;if(!(null===(n=s.target)||void 0===n?void 0:n.subType))return[];const t=((e,s)=>{const l=a.find((s=>s.class===e));return l?(s?l.defensives.filter((e=>e.spec===s||null===e.spec)):l.defensives.filter((e=>null===e.spec))).concat(a.find((e=>"Everyone"===e.class)).defensives):[]})(s.target.subType,l);if(!t)return[];const d=e.eventsByCategoryAndDisposition("casts","friendly").filter((e=>{var a;return(null===(a=e.source)||void 0===a?void 0:a.id)===s.target.id})).filter((e=>e.ability&&t.some((s=>s.spellId===e.ability.id)))).filter((e=>e.timestamp<=s.timestamp)).sort(((e,s)=>s.timestamp-e.timestamp));return t.map((e=>{const a=d.filter((s=>{var a;return(null===(a=s.ability)||void 0===a?void 0:a.id)===e.spellId})).sort(((e,s)=>s.timestamp-e.timestamp)),l=a[0],n=a[1],t=l?l.timestamp:null;let i=!1;if(t)if(e.charges)if(n){const a=e.baseCd-(s.timestamp-n.timestamp),t=e.baseCd-(s.timestamp-l.timestamp);i=a<=0||t<=0}else i=s.timestamp-t>e.baseCd;else i=s.timestamp-t>e.baseCd;else i=!0;return{ability:(null==l?void 0:l.ability)||(c=e.spellId,reportGroup.abilities.find((e=>e.id===c)))||{id:e.spellId,name:e.name?`${e.name} [Never used]`:"Unknown (Fall?)",type:0,icon:"",isExcludedFromDamageAndHealing:!1,isOffGcd:!1,isMelee:!1,isStaggerAbsorb:!1,isStaggerDamage:!1,isStaggerDmaage:!1},lastUsed:t,available:i,cooldown:e.baseCd};var c}))},d={pad:(e,s)=>e.toString().padStart(s,"0"),formatDuration:e=>{const s=Math.floor(e/6e4),a=Math.floor(e%6e4/1e3),l=e%1e3;return`${s}:${d.pad(a,2)}.${l}`},formatTimestamp:(e,s)=>d.formatDuration(s-e)};function i(e){return` <AbilityIcon id="${e.id}" icon="${e.icon}" type="${e.type}">${e.name}</AbilityIcon>`}const c=(e,s)=>`<ActorIcon type="${e.subType}-${s}">${e.name}</ActorIcon>`,r={fightId:{header:"Fight ID"},player:{header:"Player"},ability:{header:"Ability"},timestamp:{header:"Death Time",textAlign:"right"},defensiveCasts:{header:"Defensive Cast"},availableDefensives:{header:"Available Defensives"},unavailableDefensives:{header:"Unavailable Defensives"},resurrected:{header:"Resurrected",textAlign:"center"}},o=!1,p=({ability:e,startFightTime:s,abilityEvent:a,deathTime:l,resurrected:t})=>{if(!e)return"Unknown (Fall)";const c=a?`[${d.formatTimestamp(s,a.timestamp)}]`:"";if(!l||!a)return u(c,e);return!t&&l-n<=a.timestamp&&a.timestamp<=l?`<Wipe>${c}</Wipe> ${i(e)}`:u(c,e)},u=(e,s)=>`${e} ${i(s)}`,m=(e,s,a)=>{if(!s.target)return null;const n=((e,s)=>{const a=e.eventsByCategoryAndDisposition("combatResurrects","friendly").find((e=>{var a,l;return e.timestamp>s.timestamp&&(null===(a=e.target)||void 0===a?void 0:a.id)===(null===(l=s.target)||void 0===l?void 0:l.id)}));return{wasResurrected:!!a,timestamp:null==a?void 0:a.timestamp,event:a}})(e,s),r=((e,s,a,l)=>{const n=t(e,s,a);return{usedDefensives:n.filter((e=>null!==e.lastUsed)).map((a=>p({ability:a.ability,startFightTime:e.startTime,abilityEvent:{timestamp:a.lastUsed},deathTime:s.timestamp,resurrected:l}))),availableDefensives:n.filter((e=>e.available)).map((e=>`<Kill>${i(e.ability)}</Kill>`)),unavailableDefensives:n.filter((e=>!e.available&&e.lastUsed)).map((e=>{const a=Math.round((e.cooldown-(s.timestamp-e.lastUsed))/1e3);return`<Wipe>${i(e.ability)} (${a}s)</Wipe>`}))}})(e,s,a,n.wasResurrected);return{fightId:e.id,player:c(s.target,a),ability:p({ability:s.killingAbility,startFightTime:e.startTime}),timestamp:d.formatTimestamp(e.startTime,s.timestamp),defensiveCasts:g(r.usedDefensives,`<Wipe>No defensives${l?" between death and last 10 seconds":" the entire fight!!"}</Wipe>`),availableDefensives:g(r.availableDefensives,"<Wipe>No defensives available</Wipe>"),unavailableDefensives:g(r.unavailableDefensives,"<Wipe>No defensives on cooldown</Wipe>"),resurrected:n.wasResurrected?`<Kill>Yes [${d.formatTimestamp(e.startTime,n.timestamp)}]</Kill>`:"<Wipe>No</Wipe>"}},g=(e,s)=>e.length>0?e.join("<br>"):s,h=getComponent=()=>{if(o&&1!==reportGroup.fights.length)return{component:"EnhancedMarkdown",props:{content:"Please select a single fight to check death recap."}};const e=reportGroup.fights.map((e=>({fight:e,deaths:e.friendlyPlayerDeathEvents}))).map((e=>{const s=e.deaths.map((s=>m(e.fight,s,e.fight.specForPlayer(s.target)))).filter((e=>null!==e));return{fightId:e.fight.id,deaths:s}})).flatMap((e=>[b(e.fightId),...e.deaths]));return{component:"Table",props:{columns:{title:{header:"Death Recap",textAlign:"center",colSpan:5,columns:r}},data:e}}},b=e=>({fightId:e,player:e.toString(),ability:e.toString(),timestamp:e.toString(),defensiveCasts:e.toString(),availableDefensives:e.toString(),unavailableDefensives:e.toString(),resurrected:e.toString()});globalThis.getComponent=s.default})();
 /*Source Code LZString compressed, Base64 encoded 
N4KABBYEQCYKYEMAuALASnAxggDlAXNPMulrmJgPYCuANjGAHaVJgBGcYAZjYzFCAC+QA===
*/