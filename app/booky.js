angular.module('booky', [])
  .controller('MainController', function() {
    var self = this;
    self.categories = [{id:0, name: "Development"}, {id:1,name:"Design"},{id:2, name:"Humor"}];
    self.bookmarks = [
      {id:0, title:"AngularJS", url:"http://angularjs.org", category:"Development"},
      {id:1, title:"Egghead", url:"http://egghead.io", category:"Development"},
      {id:2, title:"A list part", url:"http://alistpart.com", category:"Design"},
      {id:3, title:"Dump", url:"http://dump.com", category:"Humor"}
    ];
    self.currentCategory = null;
    self.setcurrentCategory = function(category) {
        self.currentCategory = category;
        self.cancelCreating();
        self.cancelEditing();
      };
    self.iscurrentCategory = function(category) {
      return self.currentCategory !== null && category.name === self.currentCategory.name;
    };
    self.isCreating = false;
    self.isEditing = false;
    self.startCreating = function() {
      self.isCreating=true;
      self.isEditing=false;
      self.resetCreateForm();
    };
    self.cancelCreating  = function(){
      self.isCreating=false;
    };
    self.startEditing = function() {
      self.isCreating=false;
      self.isEditing=true;
    };
    self.cancelEditing = function() {
      self.isEditing=false;
    };
    self.shouldShowCreating = function() {
      return self.currentCategory && !self.isEditing;
    };
    self.shouldShowEditing = function() {
      return self.isEditing && !self.isCreating;
    };
    self.resetCreateForm = function() {
      self.newBookmark = {
        title:'',
        url:'',
        category: self.currentCategory.name
      };
    }; 
    self.createBookmark = function(bookmark) {
      bookmark.id = self.bookmarks.length;
      self.bookmarks.push(bookmark);
      self.resetCreateForm();
    };
    self.editedBookmark = null;
    self.setEditedBookmark = function(bookmark) {
      self.editedBookmark = angular.copy(bookmark);
    };
    self.updateBookmark = function(bookmark)  {
        var index = _.findIndex(self.bookmarks, function(b) {
          return b.id == bookmark.id;
        });
        self.bookmarks[index] = bookmark;
        self.editedBookmark=null;
        self.isEditing=false;
    };
    self.isSelectedBookmark = function(bookmarkId) {
      return self.editedBookmark !== null && self.editedBookmark.id === bookmarkId;
    };
    self.deleteBookmark = function(bookmark) {
      _.remove(self.bookmarks, function(b) {
        return b.id === bookmark.id;
      });
    };
  });