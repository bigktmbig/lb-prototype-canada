'use strict';

module.exports = function(app) {


  createDefaultNotes();

  function createDefaultNotes() {

    console.log('Creating notes');

    var Note = app.models.Note;

    var notes = [{
      title: "string1",
      content: "string1"
    },{
      title: "string2",
      content: "string2"
    },{
      title: "string3",
      content: "string3"
    },{
      title: "string4",
      content: "string4"
    },{
      title: "string5",
      content: "string5"
    }];

    Note.create(notes, function(err, createdNote, created) {
      if (err) {
        console.error('error running create(notes)', err);
      }
      createdNote.forEach(function(crNote) {
        console.log('{'+crNote.id+', '+crNote.title+'}\n');
      });
    });
  }
};
