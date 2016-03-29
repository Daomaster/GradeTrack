import json

import _course

class Instructor():
    highest_id = 0

    def __init__( self, _id, first = "Staff\'s First Name", last = "Staff\'s Last Name" ):
        self.id = _id

        # Assumed to be strings
        self.first = first
        self.last = last

        self.courses = {}

    def add( self, item ):
        if isinstance( item, _course.Course ):
            self.courses[ item.id ] = item
            item.instructor = self
        else:
            raise( "This shouldn\'t happen!" )

    def dict( self ):
        courses = {}
        for _id in self.courses:
            semester = self.courses[ _id ].term + "-" + self.courses[ _id ].year
            if not semester in courses:
                courses[ semester ] = []
            courses[ semester ].append( { "id" : self.courses[ _id ].id, "title" : self.courses[ _id ].title } )

        return {
            "id" : self.id,
            "first" : self.first,
            "last" : self.last,
            "courses" : courses
        }

    def json( self, indent = None, sort_keys = False ):
        return json.dumps( self.dict(), indent = indent, sort_keys = sort_keys )

    def __str__( self ):
        return self.first + " " + self.last + " " + str( self.id )

if __name__ == "__main__":
    import rand
    instructor = rand.Instructor()

    instructor.add( rand.Course() )
    instructor.add( rand.Course() )
    instructor.add( rand.Course( term = "15" ) )

    print instructor
    print instructor.dict()
    print instructor.json( indent = 2 )

