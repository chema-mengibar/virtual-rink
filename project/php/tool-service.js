
// import AppRouter from '../router/router';
import { reactive } from 'vue';

import Alphabet from "../components/basics/alphabet.vue";
import Plural from "../components/basics/plural.vue";
import Declination from "../components/basics/declination.vue";
import Adposiciones from "../components/basics/adposiciones.vue";
import Phrase from "../components/basics/phrase.vue";
import Interrogativos from "../components/basics/interrogativos.vue";
import Verb from "../components/basics/verb.vue";
import VerbList1 from "../components/basics/verbs-list-1.vue";
import PostposicionTan from "../components/basics/postposicion-tan.vue";
import PostposicionLugar from "../components/basics/postposicion-lugar.vue";
import Posesivos from "../components/basics/posesivos.vue";
import Hora from "../components/basics/hora.vue";


const progressDefault = {
    last_lesson: null,
    done: [],
    wrong: [],
}

export default class ToolService {

    domain = '//kartuli-server.motuo.info'

    lessons = []

    progress = {
        ...progressDefault
    }

    config = {
        log: true,
        force_fetch: true
    }


    constructor() {

        this._data = reactive({
            state: 'loading' // loading, loaded
        })

        this.storageCheck();
        this.loadProgress();
        this.loadLessons().then(()=>{
            this.sortLessonsbyMark();
            this.log('constructor: lessons', this.lessons.length);
    
            if (this.lessons.length == 0 ) {  // && window.location.pathname !== '/'
    
                this.log('constructor: lessons 0');
    
                // AppRouter.push({ path: '/', replace: true }).then(() => {
                //     window.location.href = '/'
                // })
            }
        });
    }

    // Hardcoded Lessons

    get basics() {
        return [
            {id:'alphabet', label: 'Alfabeto' },
            {id:'plural', label: 'Plural' },
            {id:'declination', label: 'Declinación' },
            {id:'adposiciones', label: 'Adposiciones' },
            {id:'phrase', label: 'Orden de las palabras' },
            {id:'interrogativos', label: 'Interrogativos' },
            {id:'verb', label: 'Verbos' },
            {id:'verbs-list-1', label: 'Lista verbos 1' },
            {id:'postposicionTan', label: 'postpos. -tan' },
            {id:'postposicionLugar', label: 'postpos. lugar' },
            {id:'hora', label: 'Horas' },
            {id:'posesivos', label: 'Posesivos' },
        ]
    }

    getBasicComponent( basicId ){
        switch(basicId ){
            case 'verbs-list-1':
                return VerbList1;
            case 'posesivos':
                return Posesivos;
            case 'hora':
                return Hora;
            case 'postposicionLugar':
                return PostposicionLugar;
            case 'postposicionTan':
                return PostposicionTan;
            case 'interrogativos':
                return Interrogativos;
            case 'phrase':
                return Phrase;
            case 'adposiciones':
                return Adposiciones;
            case 'declination':
                return Declination;
            case 'plural':
                return Plural;
            case 'alphabet':
                return Alphabet;
            case 'verb':
                return Verb;
            default:
                return Alphabet;
        }
    }


    // ------------- DATA
  
    getAssetsPath(dir, imgName) {
        return this.domain + '/images/' + dir + '/' + imgName 
    }

    async fetchLessons() {
        this.log('fetchLessons');
        return fetch(`${this.domain}/lessons.php`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                return res.json()
            })
            .then((jsonResponse) => {
                if (jsonResponse) {
                    this.lessons = jsonResponse;
                    setTimeout(()=>{
                        this.state = 'loaded';
                    }, 1000)
                    
                    //this.storeWriteLessons();
                    return this.lessons;
                }
            }, (error) => {
                //console.error('[ToolService] fetchLessons:', error)
            })
    }



    // -------------

    get state() {
        return this._data.state
    }

    set state( _state ) {
        this._data.state = _state
    }

    getLessons() {
        this.log('getLessons');
        return this.lessons.filter( item => item.type !== 'theme');
    }

    
    getThemes() {
        this.log('getThemes');
        return this.lessons.filter( item => item.type === 'theme');
    }

    getLessonById(lessonId) {
        this.log('getLessonById');
        return this.lessons.find(lesson => lesson.id === lessonId);
    }

    getExecById(lessonId, execId) {
        this.log('getExecById');
        const lesson = this.getLessonById(lessonId);
        if (lesson) {
            return lesson.exercises.find(exec => exec.id === execId);
        }
        return undefined;
    }

    getNextExecId(lessonId, execId) {
        this.log('getNextExecId');
        const lesson = this.getLessonById(lessonId);
        if (lesson) {
            const idx = lesson.exercises.findIndex(exec => exec.id === execId);
            const nextIdx = idx + 1;
            if (nextIdx < lesson.exercises.length) {
                return lesson.exercises[nextIdx].id;
            }else{
                return lesson.exercises[0].id;  
            }
        }
        return undefined;
    }

    async loadLessons() {
        this.log('loadLessons');

        if(this.config.force_fetch){
            await  this.fetchLessons();
            return;
        }

        try {
            const st = localStorage.getItem("lessons");
            if (st) {
                this.log('loadLessons: parse');
                this.lessons = JSON.parse(st);
                
            } else {
                this.log('loadLessons: empty');
                await  this.fetchLessons();
   
            }
        } catch (e) {
    
            this.log('loadLessons: error');
            throw new Error('Error in storage: lessons')
        }
        return
    }


    // ----------------------------- STORAGE

 

    storeWriteLessons() {
        this.log('storeWriteLessons');
        localStorage.setItem("lessons", JSON.stringify(this.lessons));
    }



    storageWrite() {
        this.log('storageWrite');
        localStorage.setItem("progress", JSON.stringify(this.progress));
    }  

    loadProgress() {
        this.log('loadProgress');
        try {
            const st = localStorage.getItem("progress");
            if (st) {
                this.progress = JSON.parse(st);
            } else {
                this.progress = {
                    ...progressDefault
                }
            }
        } catch (e) {
            //console.error('[ToolService] loadProgress', e)
            throw new Error('Error in storage')
        }
    }

    storeLessonAsLast(lessonId) {
        this.log('storeLessonAsLast');
        this.progress.last_lesson = lessonId;
        this.storageWrite();
    }


    storeExecAsDone(execId) {
        if(this.isStoredAsWrong(execId)){
            this.progress.wrong = this.progress.wrong.filter( item => item !== execId);
        }
        this.progress.done.push(execId);
        // if(!this.isStoredAsDone(execId)){
        //     this.progress.done.push(execId);
        // }else{
        //     this.progress.done = this.progress.done.filter( item => item !== execId);
        // }
        this.storageWrite();
    
    }

    storeExecAsWrong(execId) {
        if(this.isStoredAsDone(execId)){
            this.progress.done = this.progress.done.filter( item => item !== execId);
        }
        this.progress.wrong.push(execId);

        // if(!this.isStoredAsWrong(execId))
        // {
        //     this.progress.wrong.push(execId);
        // }else{
        //     this.progress.wrong = this.progress.wrong.filter( item => item !== execId);
        // }
        this.storageWrite();
    }

    storeExecAsNothing(execId) {
        this.progress.done = this.progress.done.filter( item => item !== execId);
        this.progress.wrong = this.progress.wrong.filter( item => item !== execId);
        this.storageWrite();
    }

    isStoredAsDone(execId){
       return this.progress.done.includes(execId);
    }

    isStoredAsWrong(execId){
       return this.progress.wrong.includes(execId);
    }


    // ----------------------------- UTILS

    getLastLessonFromStore() {
        this.log('getLastLessonFromStore');
        try {
            this.loadProgress();
            const lastLessonId = this.progress.last_lesson;
            return this.getLessonById(lastLessonId);

        } catch (e) {
            //console.error('[ToolService] getLastLessonFromStore: error', e)
            return undefined
        }
    }


    sortLessonsbyMark(  ){
        this.log('sortLessonsbyMark');

        this.lessons.forEach( (lessonItem, lessonIdx) =>{
            const listDone = [];
            const listWrong = [];
            const listNonState = [];

            lessonItem.exercises.forEach( (exerciseItem) =>{
                if(this.isStoredAsDone(exerciseItem.id)){
                    listDone.push(exerciseItem);
                }
                else if(this.isStoredAsWrong(exerciseItem.id)){
                    listWrong.push(exerciseItem);
                }
                else{
                    listNonState.push(exerciseItem);
                }
            });
           
            this.lessons[lessonIdx].exercises = [ 
                ...listWrong, 
                ...listNonState, 
                ...listDone, 
            ];
        })
        
    }


    // ----------------------------- DEBUG & SETTINGS


    log(){
        if(this.config.log){
            //console.log('[ToolService]', [...arguments].join(' , '))
        }
    }

    async reload(){
        this.log('reload');
        return this.fetchLessons().then( resp =>{
            this.lessons = this.sortLessonsbyMark(this.lessons);
            return 'Reload finish'
        })
    }


    storageCheck(){
        this.log('storageCheck');
        try {
            const st = localStorage.getItem("progress");
            if (st) {
               const progress = JSON.parse(st);
               if(
                ('last_lesson' in progress === false) ||
                ('done' in progress === false) ||
                ('wrong' in progress === false) 
               ){
                    this.log('storageCheck: corrupt');
                    this.log(st);
                    localStorage.clear();
                    window.location.href = '/';
                    return
               }
            }
        } catch (e) {
            localStorage.clear();
            window.location.href = '/';
            return
        }
        this.log('storageCheck: ok');
    }

}