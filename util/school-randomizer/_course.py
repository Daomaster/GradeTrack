import json

import _instructor
import _student
import _assignment
import _weight

class Course():
    def __init__( self, subject = "AAA", number = "000", section = "0000", term = "AA", year = "00", title = "Place Holder" ):
        self.subject = subject
        self.number = str( number )
        self.section = section
        self.term = term
        self.year = year
        self.title = title
        self.id = "-".join( [ self.subject, self.number, self.section, self.term, self.year ] )
        self.instructor = None
        self.students = []
        self.assignments = {}
        self.weights = []
        self.average = None

    def add( self, item ):
        if isinstance( item, _instructor.Instructor ):
            if self.instructor is None:
                self.instructor = item
                item.add( self )
        elif isinstance( item, _student.Student ):
            if not( item in self.students ):
                self.students.append( item )
                item.add( self )
        elif isinstance( item, _assignment.Assignment ):
            if not( item.id in self.assignments ):
                self.assignments[ item.id ] = item
        elif isinstance( item, _weight.Weight ):
            if not( item in self.weights ):
                self.weights.append( item )
        else:
            raise Exception( "This is not suppose to happen" )

    def dict( self ):
        if self.instructor is None:
            instructor = None
        else:
            instructor = { "id" : self.instructor.id, "first" : self.instructor.first, "last" : self.instructor.last }

        students = []
        for student in self.students:
            students.append( { "id" : student.id, "first" : student.first, "last" : student.last } )

        assignments = {}
        for assignment in self.assignments:
            assignments[ assignment ] = self.assignments[ assignment ].dict()

        weights = []
        for weight in self.weights:
            weights.append( weight.dict() )

        return {
            "id" : self.id,
            "subject" : self.subject,
            "number" : self.number,
            "section" : self.section,
            "term" : self.term,
            "year" : self.year,
            "title" : self.title,
            "instructor" : instructor,
            "students" : students,
            "assignments" : assignments,
            "weights" : weights,
            "average" : self.average
        }

    def json( self, indent = None, sort_keys = False ):
        return json.dumps( self.dict(), indent = indent, sort_keys = sort_keys )

    def __str__( self ):
        temp = "%s %s-%4s %s %2s" % ( self.subject, self.number, self.section, self.term, self.year ) + " title: " + self.title

        return temp

if __name__ == "__main__":
    import rand
    course = rand.Course()

    course.add( rand.Instructor() )
    course.add( rand.Student() )
    course.add( rand.Student() )
    course.add( rand.Student() )
    course.add( rand.Weight() )
    course.add( rand.Weight() )
    course.add( rand.Weight() )
    course.add( rand.Assignment() )
    course.add( rand.Assignment() )

    print course
    print course.dict()
    print course.json( indent = 2, sort_keys = True )

