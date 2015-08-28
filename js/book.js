$(function() {

	// book
	var Book = function(config) {
		var config = config || {};
    
	    this.template = '<li class="book-item span3" data-id="<%=data-id%>"><div class="img-cont"><img class="book-img" src="<%=img%>" alt="item1"></div><div class="book-info"><h3><%=title%></h3><span><%=author%></span><span><%=year%></span></div><a href="#" class="remove">remove</a></li>'; 
	    this.bookName = config.bookName;
	    this.author = config.author;
	    this.year = config.year;
	    this.dataId = config.dataId;
	    this.img = config.img;

	    this.appendTo = function(elem) { 
	        var parsedTpl = this.template
	            .replace('<%=title%>', this.getName())
	            .replace('<%=author%>', this.getAuthor())
	            .replace('<%=year%>', this.getYearPub())
	            .replace('<%=data-id%>', this.getDataId())
	            .replace('<%=img%>', this.getImg());	        
			elem.append(parsedTpl);
	    }	    

		this.getName = function() { 
			return this.bookName;
		}

		this.getAuthor = function() {
			return this.author;
		}

		this.getYearPub = function() {
			return this.year;
		}

		this.getDataId = function() {
			return this.dataId;
		}

		this.getImg =  function() {
			return this.img;
		}

		return this;
	},

	    BookCollection = function(config) {
			var config = config
		    template = '<ul class="books row"></ul>';

		    this.add = function(book) {
		    	var books = $('.books');
				book.appendTo(books);
			}

			this.remove = function(el) {
				var bookId = $(el).data('id'),
					bookParents = $('.books-list').find('.book'),
					bookParent,
					delInd;
					$('.book').each(function(ind, el) {
						if($(el).data('id') == bookId) {
							$(el).find('.add').show();
			    			$(el).find('.added').hide();
						}								
					});					
		    	$(el).remove();
		    	for(ind in storage){
				  if(storage[ind].dataId == bookId) {
				    delInd = ind;
				  }
				 }
		    	storage.splice(delInd, 1);
		    	localStorageMan();
		    }

			this.appendTo = function(el) {	
				var books = $(template);			
				el.append(books);			
			}
			return this;
		},

		addButton = $('.add'),
		removeButton = '.remove',
		storage = JSON.parse(localStorage.getItem('storage')) || [];

		collection = new BookCollection;
		collection.appendTo($('.my-books'));
		if(storage.length) {
			for(var i=0; i<storage.length; i++) {
				var bookId = storage[i].dataId;
					$('.book').each(function(ind, el) {
						if($(el).data('id') == bookId) {
							$(el).find('.add').hide();
			    			$(el).find('.added').show();
						}								
					});

				book = new Book({
					bookName: storage[i].bookName,
					author: storage[i].author,
					year: storage[i].year,
					dataId: storage[i].dataId,
					img: storage[i].img
				});
				collection.add(book);
			}
		}

	addButton.on('click', function(e) {
		e.preventDefault();
		var name = $(this).parent().find($('.name')).text(),
			author = $(this).parent().find($('.author')).text(),
			year = $(this).parent().find($('.year')).text(),
			dataId = $(this).parent().data('id'),
			img = $(this).parent().find($('.book-img')).attr("src"),
			book = new Book({
				bookName: name,
				author: author,
				year: year,
				dataId: dataId,
				img: img
			});

		collection.add(book);
		storage.push(book);
		localStorageMan();		
		$(this).parent().find('.added').show();
		$(this).hide();
	});

	$('.my-books').on('click', removeButton, function(e) {
		e.preventDefault();
		var book = $(this).parent();
		collection.remove(book);
	});

	function localStorageMan() {
		localStorage.removeItem('storage');
		localStorage.setItem('storage', JSON.stringify(storage));
	}

});



