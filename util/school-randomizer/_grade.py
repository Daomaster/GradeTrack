from _assignment import Assignment

import json

class Grade():
    def __init__( self, assignment, grade = 0 ):
        e = "\'%s\' is expected to be of type \'%s\', but it is of type \'%s\'."

        if not isinstance( assignment, Assignment ):
            raise Exception( e % ( "assignment", "Assignment", assignment.__class__.__name__ ) )

        if not isinstance( grade, (int, float, long) ):
            raise Exception( e % ( "grade", "int, float or long", grade.__class__.__name__ ) )

        self.assignment = assignment
        self.grade = grade

    def dict( self ):
        return {
            "id" : self.assignment.id,
            "grade" : self.grade
        }

    def json( self, indent = None, sort_keys = False ):
        return json.dumps( self.dict(), indent = indent, sort_keys = sort_keys )
        
    def __str__( self ):
        temp = "id: " + str( self.assignment.id ) + ", grade: " + str( self.grade )

        return temp

if __name__ == "__main__":
    import rand
    grade = rand.Grade()

    print grade
    print grade.dict()
    print grade.json( indent = 2 )
