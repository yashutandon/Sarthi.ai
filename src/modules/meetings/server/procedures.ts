import { db } from "@/db";
import {  meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { and, desc, eq, getTableColumns, ilike, count } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../schemas";

export const meetingsRouter = createTRPCRouter({
   update: protectedProcedure
      .input(meetingsUpdateSchema)
      .mutation(async ({ ctx, input }) => {
        const [updateMeeting] = await db
          .update(meetings)
          .set(input)
          .where(
            and(
              eq(meetings.id, input.id),
              eq(meetings.userId, ctx.auth.user.id),
            )
          ).returning();
        if (!updateMeeting) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Meeting not found',
          });
        }
        return updateMeeting;
      }),

  create: protectedProcedure.input(meetingsInsertSchema).mutation(async ({ input, ctx }) => {
      const [createdMeeting] = await db
        .insert(meetings)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();
  
      return createdMeeting;
    }),
 
  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const [existingMeeting] = await db.select({
     
      ...getTableColumns(meetings),
    }).from(meetings)
      .where
      (and
        (eq
          (meetings.id, input.id),
          eq(meetings.userId, ctx.auth.user.id),
        )
      );

    if (!existingMeeting) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Meeting not found" })
    }
    return existingMeeting;
  }),

  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;

      const searchCondition = search?.trim()
        ? ilike(meetings.name, `%${search.trim()}%`)
        : undefined;

      const baseConditions = and(
        eq(meetings.userId, ctx.auth.user.id),
        searchCondition
      );

      const data = await db
        .select({
          
          ...getTableColumns(meetings),
        })
        .from(meetings)
        .where(baseConditions)
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({ count: count() })
        .from(meetings)
        .where(baseConditions);

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),
})