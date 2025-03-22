let getComponent;(()=>{"use strict";var e={d:(s,l)=>{for(var d in l)e.o(l,d)&&!e.o(s,d)&&Object.defineProperty(s,d,{enumerable:!0,get:l[d]})},o:(e,s)=>Object.prototype.hasOwnProperty.call(e,s)},s={};function l(e){return` <AbilityIcon id="${e.id}" icon="${e.icon}" type="${e.type}">${e.name}</AbilityIcon>`}e.d(s,{default:()=>t});const d=[{class:"Death Knight",defensives:[{spellId:48743,baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:49039,baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:48792,baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:51052,baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:48707,baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:49998,baseCd:0,cdReduction:!1,charges:!1,spec:null}]},{class:"Demon Hunter",defensives:[{spellId:196718,baseCd:3e5,cdReduction:!0,charges:!1,spec:null},{spellId:196555,baseCd:18e4,cdReduction:!1,charges:!1,spec:"Havoc"},{spellId:198589,baseCd:6e4,cdReduction:!1,charges:!1,spec:"Havoc"}]},{class:"Druid",defensives:[{spellId:319454,baseCd:3e5,cdReduction:!1,charges:!1,spec:null},{spellId:108238,baseCd:9e4,cdReduction:!1,charges:!1,spec:null},{spellId:124974,baseCd:9e4,cdReduction:!1,charges:!1,spec:null},{spellId:22812,baseCd:6e4,cdReduction:!1,charges:!1,spec:null},{spellId:22842,baseCd:36e3,cdReduction:!0,charges:!1,spec:null},{spellId:5487,baseCd:0,cdReduction:!1,charges:!1,spec:null},{spellId:61336,baseCd:18e4,cdReduction:!1,charges:!1,spec:"Feral"}]},{class:"Evoker",defensives:[{spellId:374227,baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:363916,baseCd:9e4,cdReduction:!0,charges:!0,spec:null},{spellId:374348,baseCd:9e4,cdReduction:!0,charges:!1,spec:null},{spellId:360827,baseCd:3e4,cdReduction:!1,charges:!1,spec:"Augmentation"}]},{class:"Hunter",defensives:[{spellId:186265,baseCd:18e4,cdReduction:!0,charges:!1,spec:null},{spellId:109304,baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:264735,baseCd:12e4,cdReduction:!0,charges:!0,spec:null},{spellId:388035,baseCd:12e4,cdReduction:!1,charges:!1,spec:null}]},{class:"Mage",defensives:[{spellId:414658,baseCd:24e4,cdReduction:!0,charges:!1,spec:null},{spellId:45438,baseCd:24e4,cdReduction:!0,charges:!1,spec:null},{spellId:55342,baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:110960,baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:414660,baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:342245,baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:342247,baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:235450,baseCd:25e3,cdReduction:!1,charges:!1,spec:"Arcane"},{spellId:235313,baseCd:25e3,cdReduction:!1,charges:!1,spec:"Fire"},{spellId:235219,baseCd:3e5,cdReduction:!1,charges:!1,spec:"Frost"},{spellId:11426,baseCd:25e3,cdReduction:!1,charges:!1,spec:"Frost"}]},{class:"Monk",defensives:[{spellId:115203,baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:122783,baseCd:9e4,cdReduction:!1,charges:!1,spec:null},{spellId:122470,baseCd:9e4,cdReduction:!1,charges:!1,spec:"Windwalker"}]},{class:"Paladin",defensives:[{spellId:471195,baseCd:6e5,cdReduction:!0,charges:!1,spec:null},{spellId:1022,baseCd:3e5,cdReduction:!0,charges:!1,spec:null},{spellId:642,baseCd:3e5,cdReduction:!0,charges:!1,spec:null},{spellId:6940,baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:498,baseCd:9e4,cdReduction:!0,charges:!1,spec:"Holy"},{spellId:403876,baseCd:9e4,cdReduction:!0,charges:!1,spec:"Retribution"},{spellId:184662,baseCd:9e4,cdReduction:!1,charges:!1,spec:"Retribution"}]},{class:"Priest",defensives:[{spellId:108968,baseCd:3e5,cdReduction:!1,charges:!1,spec:null},{spellId:15286,baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:19236,baseCd:9e4,cdReduction:!0,charges:!1,spec:null},{spellId:586,baseCd:3e4,cdReduction:!0,charges:!1,spec:null},{spellId:47585,baseCd:12e4,cdReduction:!1,charges:!1,spec:"Shadow"}]},{class:"Rogue",defensives:[{spellId:5277,baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:31224,baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:185311,baseCd:3e4,cdReduction:!1,charges:!1,spec:null},{spellId:1966,baseCd:15e3,cdReduction:!0,charges:!0,spec:null}]},{class:"Shaman",defensives:[{spellId:198103,baseCd:3e5,cdReduction:!1,charges:!1,spec:null},{spellId:108271,baseCd:12e4,cdReduction:!0,charges:!1,spec:null},{spellId:108281,baseCd:12e4,cdReduction:!1,charges:!1,spec:null},{spellId:108270,baseCd:12e4,cdReduction:!0,charges:!1,spec:null}]},{class:"Warlock",defensives:[{spellId:104773,baseCd:18e4,cdReduction:!0,charges:!1,spec:null},{spellId:108416,baseCd:6e4,cdReduction:!0,charges:!1,spec:null},{spellId:452930,baseCd:6e4,cdReduction:!1,charges:!1,spec:null},{spellId:6789,baseCd:45e3,cdReduction:!1,charges:!1,spec:null},{spellId:234153,baseCd:0,cdReduction:!1,charges:!1,spec:null}]},{class:"Warrior",defensives:[{spellId:383762,baseCd:18e4,cdReduction:!1,charges:!1,spec:null},{spellId:97462,baseCd:18e4,cdReduction:!1,charges:!1,spec:null},{spellId:202168,baseCd:25e3,cdReduction:!1,charges:!1,spec:null},{spellId:23920,baseCd:25e3,cdReduction:!0,charges:!1,spec:null},{spellId:386208,baseCd:3e3,cdReduction:!1,charges:!1,spec:null},{spellId:118038,baseCd:12e4,cdReduction:!0,charges:!1,spec:"Arms"},{spellId:190456,baseCd:11e3,cdReduction:!1,charges:!1,spec:"Arms"},{spellId:184364,baseCd:12e4,cdReduction:!0,charges:!1,spec:"Fury"}]},{class:"Everyone",defensives:[{spellId:6262,baseCd:0,cdReduction:!1,charges:!1,spec:null},{spellId:431416,baseCd:3e5,cdReduction:!1,charges:!1,spec:null}]}],c=(e,s,d,c)=>{if(null===e)return"Unknown (Fall)";const n=d?`[${a(s,d.timestamp)}]`:"";return c&&d?c-1e4>d.timestamp?`${n} ${l(e)}`:`<Wipe>${n}</Wipe> ${l(e)}`:`${n} ${l(e)}`},n=(e,s,l)=>{if(null==e.ability)return null;if(null==e.source)return null;const c=((e,s)=>{const l=d.find((s=>s.class===e));return l?(s?l.defensives.filter((e=>e.spec===s||null===e.spec)):l.defensives.filter((e=>null===e.spec))).concat(d.find((e=>"Everyone"===e.class)).defensives):[]})(e.source.subType,l);if(!c)return null;return c.map((e=>e.spellId)).includes(e.ability.id)?s.timestamp<e.timestamp?null:{ability:e.ability,event:e}:null},a=(e,s)=>{const l=s-e,d=l%1e3;return`${Math.floor(l/6e4)}:${((e,s)=>{let l=e.toString();for(;l.length<s;)l="0"+l;return l})(Number((l%6e4/1e3).toFixed(0)),2)}:${d}`},t=getComponent=()=>({component:"Table",props:{columns:{title:{header:"Death Recap",textAlign:"center",colSpan:5,columns:{fightId:{header:"Fight ID"},player:{header:"Player"},ability:{header:"Ability"},timestamp:{header:"Death Time",textAlign:"right"},defensiveCasts:{header:"Defensive Casts"}}}},data:reportGroup.fights.flatMap((e=>{const s=e.friendlyPlayerDeathEvents.length>5?5:e.friendlyPlayerDeathEvents.length,l=e.friendlyPlayerDeathEvents.slice(0,s);return{fight:e,deaths:l}})).reduce(((e,s)=>{const l=s.deaths.reduce(((e,l)=>{if(!l.target)return e;const d=s.fight.specForPlayer(l.target),t=((e,s,l)=>{var d;return null===(d=s.target)||void 0===d||d.subType,e.eventsByCategoryAndDisposition("casts","friendly").filter((e=>{var l;return null!=e.source&&(null===(l=s.target)||void 0===l?void 0:l.id)===e.source.id})).map((e=>n(e,s,l))).filter((e=>null!==e)).reduce(((l,d)=>(null!==d&&l.push(c(d.ability,e.startTime,d.event,s.timestamp)),l)),[])})(s.fight,l,d),i=s.fight.startTime,p=a(i,l.timestamp);var r,u;return e.push({fightId:s.fight.id,player:l.target?(r=l.target,u=d,`<ActorIcon type="${r.subType}-${u}">${r.name}</ActorIcon>`):"Unknown",ability:c(l.killingAbility,i),timestamp:p,defensiveCasts:t&&t.length>0?t.join("<br>"):"<Wipe>No defensives the entire fight!!</Wipe>"}),e}),[]);return e.push({fightId:s.fight.id,deaths:l}),e}),[]).flatMap((e=>[{fightId:e.fightId,player:e.fightId,ability:e.fightId,timestamp:e.fightId,defensiveCasts:e.fightId},...e.deaths]))}});globalThis.getComponent=s.default})();