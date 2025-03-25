let getComponent;(()=>{"use strict";var e={d:(s,a)=>{for(var t in a)e.o(a,t)&&!e.o(s,t)&&Object.defineProperty(s,t,{enumerable:!0,get:a[t]})},o:(e,s)=>Object.prototype.hasOwnProperty.call(e,s)},s={};e.d(s,{default:()=>g});const a=[{class:"DeathKnight",defensives:[{spellId:48743,name:"Death Pact",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:49039,name:"Lichborne",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:48792,name:"Icebound Fortitude",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:51052,name:"Anti-Magic Zone",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:48707,name:"Anti-Magic Shell",baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:49998,name:"Death Strike",baseCd:0,cdReduction:!1,charges:!1,spec:null}]},{class:"DemonHunter",defensives:[{spellId:196718,name:"Darkness",baseCd:3e5,cdReduction:!0,charges:!1,spec:null},{spellId:196555,name:"Netherwalk",baseCd:18e4,cdReduction:!1,charges:!1,spec:"Havoc"},{spellId:198589,name:"Blur",baseCd:6e4,cdReduction:!1,charges:!1,spec:"Havoc"}]},{class:"Druid",defensives:[{spellId:319454,name:"Heart of the Wild",baseCd:3e5,cdReduction:!1,charges:!1,spec:null},{spellId:108238,name:"Renewal",baseCd:9e4,cdReduction:!1,charges:!1,spec:null},{spellId:124974,name:"Nature's Vigil",baseCd:9e4,cdReduction:!1,charges:!1,spec:null},{spellId:22812,name:"Barkskin",baseCd:6e4,cdReduction:!1,charges:!1,spec:null},{spellId:22842,name:"Frenzied Regeneration",baseCd:36e3,cdReduction:!0,charges:!1,spec:null},{spellId:5487,name:"Bear Form",baseCd:0,cdReduction:!1,charges:!1,spec:null},{spellId:61336,name:"Feral Instincts",baseCd:18e4,cdReduction:!1,charges:!1,spec:"Feral"}]},{class:"Evoker",defensives:[{spellId:374227,name:"Zephyr",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:363916,name:"Obsidian Scales",baseCd:9e4,cdReduction:!0,charges:!0,spec:null},{spellId:374348,name:"Renewing Blaze",baseCd:9e4,cdReduction:!0,charges:!1,spec:null},{spellId:360827,name:"Blistering Scales",baseCd:3e4,cdReduction:!1,charges:!1,spec:"Augmentation"}]},{class:"Hunter",defensives:[{spellId:186265,name:"Aspect of the Turtle",baseCd:18e4,cdReduction:!0,charges:!1,spec:null},{spellId:109304,name:"Exhilaration",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:264735,name:"Survival of the Fittest",baseCd:12e4,cdReduction:!0,charges:!0,spec:null},{spellId:388035,name:"Fortitude of the Bear",baseCd:12e4,cdReduction:!1,charges:!1,spec:null}]},{class:"Mage",defensives:[{spellId:414658,name:"Ice Cold",baseCd:24e4,cdReduction:!0,charges:!1,spec:null},{spellId:45438,name:"Ice Block",baseCd:24e4,cdReduction:!0,charges:!1,spec:null},{spellId:55342,name:"Mirror Image",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:110960,name:"Greater Invisibility",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:414660,name:"Mass Barrier",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:342245,name:"Alter Time",baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:342247,name:"Alter Time",baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:235450,name:"Prismatic Barrier",baseCd:25e3,cdReduction:!1,charges:!1,spec:"Arcane"},{spellId:235313,name:"Blazing Barrier",baseCd:25e3,cdReduction:!1,charges:!1,spec:"Fire"},{spellId:235219,name:"Cold Snap",baseCd:3e5,cdReduction:!1,charges:!1,spec:"Frost"},{spellId:11426,name:"Frost Barrier",baseCd:25e3,cdReduction:!1,charges:!1,spec:"Frost"}]},{class:"Monk",defensives:[{spellId:115203,name:"Fortifying Brew",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:122783,name:"Diffuse Magic",baseCd:9e4,cdReduction:!1,charges:!1,spec:null},{spellId:122470,name:"Touch of Karma",baseCd:9e4,cdReduction:!1,charges:!1,spec:"Windwalker"}]},{class:"Paladin",defensives:[{spellId:471195,name:"Lay on Hands",baseCd:6e5,cdReduction:!0,charges:!1,spec:null},{spellId:1022,name:"Blessing of Protection",baseCd:3e5,cdReduction:!0,charges:!1,spec:null},{spellId:642,name:"Divine Shield",baseCd:3e5,cdReduction:!0,charges:!1,spec:null},{spellId:6940,name:"Blessing of Sacrifice",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:498,name:"Divine Protection",baseCd:9e4,cdReduction:!0,charges:!1,spec:"Holy"},{spellId:403876,name:"Divine Protection",baseCd:9e4,cdReduction:!0,charges:!1,spec:"Retribution"},{spellId:184662,name:"Shield of Vengeance",baseCd:9e4,cdReduction:!1,charges:!1,spec:"Retribution"}]},{class:"Priest",defensives:[{spellId:108968,name:"Void Shift",baseCd:3e5,cdReduction:!1,charges:!1,spec:null},{spellId:15286,name:"Vampiric Embrace",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:19236,name:"Desperate Prayer",baseCd:9e4,cdReduction:!0,charges:!1,spec:null},{spellId:586,name:"Fade",baseCd:3e4,cdReduction:!0,charges:!1,spec:null},{spellId:47585,name:"Dispersion",baseCd:12e4,cdReduction:!1,charges:!1,spec:"Shadow"}]},{class:"Rogue",defensives:[{spellId:5277,name:"Evasion",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:31224,name:"Cloak of Shadows",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:185311,name:"Crimson Vial",baseCd:3e4,cdReduction:!1,charges:!1,spec:null},{spellId:1966,name:"Feint",baseCd:15e3,cdReduction:!0,charges:!0,spec:null}]},{class:"Shaman",defensives:[{spellId:198103,name:"Earth Elemental",baseCd:3e5,cdReduction:!1,charges:!1,spec:null},{spellId:108271,name:"Astral Shift",baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:108281,name:"Ancestral Guidance",baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:108270,name:"Stone Bulwark Totem",baseCd:12e4,cdReduction:!0,charges:!1,spec:null}]},{class:"Warlock",defensives:[{spellId:104773,name:"Unending Resolve",baseCd:18e4,cdReduction:!0,charges:!1,spec:null},{spellId:108416,name:"Dark Pact",baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:452930,name:"Demonic Healthstone",baseCd:6e4,cdReduction:!1,charges:!1,spec:null},{spellId:6789,name:"Mortal Coil",baseCd:45e3,cdReduction:!1,charges:!1,spec:null},{spellId:234153,name:"Drain Life",baseCd:0,cdReduction:!1,charges:!1,spec:null}]},{class:"Warrior",defensives:[{spellId:383762,name:"Bitter Immunity",baseCd:18e4,cdReduction:!1,charges:!1,spec:null},{spellId:97462,name:"Rallying Cry",baseCd:18e4,cdReduction:!1,charges:!1,spec:null},{spellId:202168,name:"Impending Victory",baseCd:25e3,cdReduction:!1,charges:!1,spec:null},{spellId:23920,name:"Spell Reflection",baseCd:25e3,cdReduction:!0,charges:!1,spec:null},{spellId:386208,name:"Defensive Stance",baseCd:3e3,cdReduction:!1,charges:!1,spec:null},{spellId:118038,name:"Die by the Sword",baseCd:12e4,cdReduction:!0,charges:!1,spec:"Arms"},{spellId:190456,name:"Ignore Pain",baseCd:11e3,cdReduction:!1,charges:!1,spec:"Arms"},{spellId:184364,name:"Enraged Regeneration",baseCd:12e4,cdReduction:!0,charges:!1,spec:"Fury"}]},{class:"Everyone",defensives:[{spellId:6262,name:"Healthstone",baseCd:0,cdReduction:!1,charges:!1,spec:null},{spellId:431416,name:"Algari Healing Potion",baseCd:3e5,cdReduction:!1,charges:!1,spec:null}]}],t=(e,s)=>{const t=a.find((s=>s.class===e));if(!t)return[];return(s?t.defensives.filter((e=>e.spec===s||null===e.spec)):t.defensives.filter((e=>null===e.spec))).concat(a.find((e=>"Everyone"===e.class)).defensives)},l={CHECK_BY_LAST_10_SECONDS:!1,MAX_DEATHS_COUNT:eventFilters.deathsCutoff||3,LAST_SECONDS_THRESHOLD:1e4,BUFF_CHECK_WINDOW:500},i={pad:(e,s)=>e.toString().padStart(s,"0"),formatDuration:e=>{const s=Math.floor(e/6e4),a=Math.floor(e%6e4/1e3),t=e%1e3;return`${s}:${i.pad(a,2)}.${t}`},formatTimestamp:(e,s)=>i.formatDuration(s-e)};function n(e){return` <AbilityIcon id="${e.id}" icon="${e.icon}" type="${e.type}">${e.name}</AbilityIcon>`}const d=(e,s)=>`<ActorIcon type="${e.subType}-${s}">${e.name}</ActorIcon>`,c={player:{header:"Player"},ability:{header:"Ability"},timestamp:{header:"Death Time",textAlign:"right"},defensiveCasts:{header:"Defensive Cast"},availableDefensives:{header:"Available Defensives"},unavailableDefensives:{header:"Unavailable Defensives"},activeBuffs:{header:"Active Buffs",textAlign:"center"},resurrected:{header:"Resurrected",textAlign:"center"}},r=!1,o=({ability:e,startFightTime:s,abilityEvent:a,deathTime:t,resurrected:d})=>{if(!e)return"Unknown (Fall)";const c=a?`[${i.formatTimestamp(s,a.timestamp)}]`:"";if(!t||!a)return p(c,e);return!d&&t-l.LAST_SECONDS_THRESHOLD<=a.timestamp&&a.timestamp<=t?`<Wipe>${c}</Wipe> ${n(e)}`:p(c,e)},p=(e,s)=>`${e} ${n(s)}`,u=(e,s,a,l)=>{const i=((e,s,a)=>{var l;if(!(null===(l=s.target)||void 0===l?void 0:l.subType))return[];const i=t(s.target.subType,a);if(!i)return[];const n=e.eventsByCategoryAndDisposition("casts","friendly").filter((e=>{var a;return(null===(a=e.source)||void 0===a?void 0:a.id)===s.target.id})).filter((e=>e.ability&&i.some((s=>s.spellId===e.ability.id)))).filter((e=>e.timestamp<=s.timestamp)).sort(((e,s)=>s.timestamp-e.timestamp));return i.map((e=>{const a=n.filter((s=>{var a;return(null===(a=s.ability)||void 0===a?void 0:a.id)===e.spellId})).sort(((e,s)=>s.timestamp-e.timestamp)),t=a[0],l=a[1],i=t?t.timestamp:null;let d=!1;if(i)if(e.charges)if(l){const a=e.baseCd-(s.timestamp-l.timestamp),i=e.baseCd-(s.timestamp-t.timestamp);d=a<=0||i<=0}else d=s.timestamp-i>e.baseCd;else d=s.timestamp-i>e.baseCd;else d=!0;return{ability:(null==t?void 0:t.ability)||(c=e.spellId,reportGroup.abilities.find((e=>e.id===c)))||{id:e.spellId,name:e.name?`${e.name} [Never used]`:"Unknown (Fall?)",type:0,icon:"",isExcludedFromDamageAndHealing:!1,isOffGcd:!1,isMelee:!1,isStaggerAbsorb:!1,isStaggerDamage:!1,isStaggerDmaage:!1},lastUsed:i,available:d,cooldown:e.baseCd};var c}))})(e,s,a);return{usedDefensives:i.filter((e=>null!==e.lastUsed)).sort(((e,s)=>e.lastUsed-s.lastUsed)).map((a=>o({ability:a.ability,startFightTime:e.startTime,abilityEvent:{timestamp:a.lastUsed},deathTime:s.timestamp,resurrected:l}))),availableDefensives:i.filter((e=>e.available)).map((e=>`<Kill>${n(e.ability)}</Kill>`)),unavailableDefensives:i.filter((e=>!e.available&&e.lastUsed)).map((e=>{const a=Math.round((e.cooldown-(s.timestamp-e.lastUsed))/1e3);return`<Wipe>${n(e.ability)} (${a}s)</Wipe>`}))}},m=(e,s,a)=>{if(!s.target)return null;const c=((e,s)=>{const a=e.eventsByCategoryAndDisposition("combatResurrects","friendly").find((e=>{var a,t;return e.timestamp>s.timestamp&&(null===(a=e.target)||void 0===a?void 0:a.id)===(null===(t=s.target)||void 0===t?void 0:t.id)}));return{wasResurrected:!!a,timestamp:null==a?void 0:a.timestamp,event:a}})(e,s),r=u(e,s,a,c.wasResurrected),p=((e,s,a)=>{var l;if(!s.target)return[];const i=t(s.target.subType,a).map((e=>e.spellId)),n={},d=e.eventsByCategoryAndDisposition("aurasGained","friendly").filter((e=>{var a,t;return(null===(a=e.target)||void 0===a?void 0:a.id)===(null===(t=s.target)||void 0===t?void 0:t.id)&&("removebuff"===e.type||"removebuffstack"===e.type?e.timestamp<=s.timestamp+500:e.timestamp<=s.timestamp)&&e.ability&&i.includes(e.ability.id)}));d.sort(((e,s)=>e.timestamp-s.timestamp));for(const e of d){if(!(null===(l=e.ability)||void 0===l?void 0:l.id))continue;const a=e.ability.id;if("removebuff"===e.type||"removebuffstack"===e.type){if(e.timestamp>s.timestamp+500)continue;if(Math.abs(e.timestamp-s.timestamp)<=500)continue}"applybuff"===e.type?n[a]=1:"applybuffstack"===e.type?n[a]=(n[a]||0)+1:"removebuffstack"===e.type?n[a]=Math.max(0,(n[a]||0)-1):"removebuff"===e.type&&(n[a]=0)}const c=d.filter((e=>{var s;return(null===(s=e.ability)||void 0===s?void 0:s.id)&&n[e.ability.id]>0&&("applybuff"===e.type||"applybuffstack"===e.type)})).reduce(((e,s)=>{var a;if(!(null===(a=s.ability)||void 0===a?void 0:a.id))return e;const t=e.find((e=>{var a,t;return(null===(a=e.ability)||void 0===a?void 0:a.id)===(null===(t=s.ability)||void 0===t?void 0:t.id)}));return(!t||s.timestamp>t.timestamp)&&(t&&e.splice(e.indexOf(t),1),e.push(s)),e}),[]);return c})(e,s,a),m=p.map((e=>`<Kill>${n(e.ability)}</Kill>`));return{fightId:e.id,player:d(s.target,a),ability:o({ability:s.killingAbility,startFightTime:e.startTime}),timestamp:i.formatTimestamp(e.startTime,s.timestamp),defensiveCasts:b(r.usedDefensives,`<Wipe>No defensives${l.CHECK_BY_LAST_10_SECONDS?" between death and last 10 seconds":" the entire fight!!"}</Wipe>`),availableDefensives:b(r.availableDefensives,"<Wipe>No defensives available</Wipe>"),unavailableDefensives:b(r.unavailableDefensives,"<Wipe>No defensives on cooldown</Wipe>"),activeBuffs:b(m,"<Wipe>None</Wipe>"),resurrected:c.wasResurrected?`<Kill>Yes [${i.formatTimestamp(e.startTime,c.timestamp)}]</Kill>`:"<Wipe>No</Wipe>"}},b=(e,s)=>e.length>0?e.join("<br>"):s,g=getComponent=()=>{if(r&&1!==reportGroup.fights.length)return{component:"EnhancedMarkdown",props:{content:"Please select a single fight to check death recap."}};return{component:"Flex",props:{direction:"column",gap:8,divs:(e=>{const s=[];return e.map((e=>{s.push({data:{component:"Table",props:{columns:{title:{header:`Death Recap - Fight ID: ${e.fightId}`,textAlign:"center",colSpan:5,columns:c}},data:e.deaths}}})})),s})(reportGroup.fights.map((e=>({fight:e,deaths:e.friendlyPlayerDeathEvents.slice(0,l.MAX_DEATHS_COUNT)}))).map((e=>{const s=e.deaths.map((s=>m(e.fight,s,e.fight.specForPlayer(s.target)))).filter((e=>null!==e));return{fightId:e.fight.id,deaths:s}})))}}};globalThis.getComponent=s.default})();
 /*Source Code LZString compressed, Base64 encoded 
N4KABBYEQCYKYEMAuALASnAxggDlAXNPMulrmJgPYCuANjGAHaVJgBGcYAZjYzFCAC+QA===
*/