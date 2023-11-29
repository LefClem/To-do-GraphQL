import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Note } from '../entities/note';
import * as NoteService from '../services/note.service'

@InputType()
class NoteInput {
    @Field()
    text: string = "";
    @Field()
    date: Date = new Date();
}

@Resolver(Note)
export class NoteResolver {
    @Query(() => [Note])
    getNotes(): Promise<Note[]>{
        return NoteService.getNotes();
    }

    @Query(() => Note)
    getOneNote(@Arg("id") id: number): Promise<Note | null>{
        return NoteService.getNoteById(id);
    }
    
    @Mutation(() => Note)
    createNewNote(
        @Arg("noteData") data: NoteInput): Promise<Note>{
        return NoteService.createNote({...data})
    }

    @Mutation(() => String)
    deleteNote(@Arg("id") id: number): Promise<String>{
        return NoteService.deleteNote(id);
    }
}