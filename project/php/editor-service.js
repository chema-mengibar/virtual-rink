import { reactive } from 'vue'

export default class EditorService {

  constructor(toolService) {
    console.log('Editor Service conszr')

    this.toolService = toolService;
  }


  async saveLesson(lessonId, data, code) {


    var fd = new FormData();

    fd.append("id", lessonId);
    fd.append("data", JSON.stringify(data));
    fd.append("code", code);

    return fetch(`${this.toolService.domain}/save.php`, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
      },
      body: fd
    })
      .then((resp) => {
        //console.log('RESP', resp)


        this.toolService.fetchLessons().then()
        return resp
      }, (error) => {
        console.error('[EditorService] saveData:', error)
      })
  }



}