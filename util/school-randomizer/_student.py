import json

import _course
import _grade

class Student():
    def __init__( self, _id, first = "Student\'s first Name", last = "Student\'s Last Name" ):
        self.id = _id
        self.first = first
        self.last = last
        self.courses = {}
        self.grades = {}

    def add( self, item ):
        if isinstance( item, _course.Course ):
            if not( item.id in self.courses ):
                self.courses[ item.id ] = item
                self.grades[ item.id ] = {}
                item.add( self )
        elif isinstance( item, tuple ) and len( item ) == 2 and isinstance( item[ 0 ], _course.Course ) and isinstance( item[ 1 ], _grade.Grade ):
            self.grades[ item[ 0 ].id ][ item[ 1 ].assignment.id ] = item[ 1 ]
        else:
            raise Exception( "This shouldn\'t happen!" )

    def dict( self ):
        courses = {}
        for _id in self.courses:
            semester = self.courses[ _id ].term + "-" + self.courses[ _id ].year
            if not semester in courses:
                courses[ semester ] = []
            courses[ semester ].append( { "id" : self.courses[ _id ].id, "title" : self.courses[ _id ].title } )

        grades = {}
        for _id in self.grades:
            semester = "-".join( _id.split( "-" )[ 3 : ] )
            if not semester in grades:
                grades[ semester ] = {}
            if not _id in grades[ semester ]:
                grades[ semester ][ _id ] = {}
            for assignment in self.grades[ _id ]:
                grades[ semester ][ _id ][ self.grades[ _id ][ assignment ].assignment.id ] = self.grades[ _id ][ assignment ].grade

        return {
            "id" : self.id,
            "first" : self.first,
            "last" : self.last,
            "courses" : courses,
            "grades" : grades
        }
    def json( self, indent = None, sort_keys = False ):
        return json.dumps( self.dict(), indent = indent, sort_keys = sort_keys )

    def __str__( self ):
        return self.first + " " + self.last + " " + str( self.id )


if __name__ == "__main__":
    import rand
    student = rand.Student()

    student.add( rand.Course() )
    student.add( rand.Course( term = "SP" ) )
    student.add( rand.Course() )

    print student
    print student.dict()
    print student.json( indent = 2 )

