"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Sparkles, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  calculateLifePathNumber,
  calculateDestinyNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
  getNumerologyMeaning,
} from "@/lib/numerology"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  birthDate: z.string().refine(
    (date) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/
      return regex.test(date)
    },
    {
      message: "Please enter a valid date in YYYY-MM-DD format.",
    },
  ),
})

export default function NumerologyCalculator() {
  const [results, setResults] = useState(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const lifePathNumber = calculateLifePathNumber(values.birthDate)
    const destinyNumber = calculateDestinyNumber(values.fullName)
    const soulUrgeNumber = calculateSoulUrgeNumber(values.fullName)
    const personalityNumber = calculatePersonalityNumber(values.fullName)

    setResults({
      lifePathNumber,
      destinyNumber,
      soulUrgeNumber,
      personalityNumber,
      name: values.fullName,
      birthDate: values.birthDate,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-300" />
            Numerology Calculator
            <Sparkles className="h-8 w-8 text-purple-300" />
          </h1>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Discover the hidden meanings in your name and birth date through the ancient practice of numerology
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
          <Card className="bg-indigo-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle>Enter Your Details</CardTitle>
              <CardDescription className="text-purple-200">We'll calculate your key numerology numbers</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full birth name"
                            {...field}
                            className="bg-indigo-950/50 border-purple-500/30"
                          />
                        </FormControl>
                        <FormDescription className="text-purple-300">
                          Use your full birth name for accurate results
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="bg-indigo-950/50 border-purple-500/30" />
                        </FormControl>
                        <FormDescription className="text-purple-300">
                          Your complete birth date (MM/DD/YYYY)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Calculate Your Numbers
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {results ? (
            <Card className="bg-indigo-900/50 border-purple-500/30">
              <CardHeader>
                <CardTitle>Your Numerology Profile</CardTitle>
                <CardDescription className="text-purple-200">Results for {results.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="lifePath">
                  <TabsList className="grid grid-cols-4 bg-indigo-950/50">
                    <TabsTrigger value="lifePath">Life Path</TabsTrigger>
                    <TabsTrigger value="destiny">Destiny</TabsTrigger>
                    <TabsTrigger value="soulUrge">Soul Urge</TabsTrigger>
                    <TabsTrigger value="personality">Personality</TabsTrigger>
                  </TabsList>
                  <TabsContent value="lifePath" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Life Path Number</h3>
                        <span className="text-3xl font-bold text-purple-300">{results.lifePathNumber}</span>
                      </div>
                      <Separator className="bg-purple-500/30" />
                      <p className="text-purple-100">{getNumerologyMeaning("lifePath", results.lifePathNumber)}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="destiny" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Destiny Number</h3>
                        <span className="text-3xl font-bold text-purple-300">{results.destinyNumber}</span>
                      </div>
                      <Separator className="bg-purple-500/30" />
                      <p className="text-purple-100">{getNumerologyMeaning("destiny", results.destinyNumber)}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="soulUrge" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Soul Urge Number</h3>
                        <span className="text-3xl font-bold text-purple-300">{results.soulUrgeNumber}</span>
                      </div>
                      <Separator className="bg-purple-500/30" />
                      <p className="text-purple-100">{getNumerologyMeaning("soulUrge", results.soulUrgeNumber)}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="personality" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Personality Number</h3>
                        <span className="text-3xl font-bold text-purple-300">{results.personalityNumber}</span>
                      </div>
                      <Separator className="bg-purple-500/30" />
                      <p className="text-purple-100">
                        {getNumerologyMeaning("personality", results.personalityNumber)}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="flex items-center text-sm text-purple-300">
                  <Info className="h-4 w-4 mr-1" />
                  <span>Numerology is for entertainment purposes only</span>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-indigo-900/50 border-purple-500/30">
              <CardHeader>
                <CardTitle>Your Numerology Profile</CardTitle>
                <CardDescription className="text-purple-200">Enter your details to see your results</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                <Sparkles className="h-12 w-12 text-purple-400 mb-4" />
                <p className="text-purple-200">
                  Fill out the form to discover the cosmic numbers that influence your life path, destiny, soul urge,
                  and personality.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-12 bg-indigo-900/30 rounded-lg p-6 border border-purple-500/20">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Info className="h-5 w-5 mr-2 text-purple-300" />
            About Numerology
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-2">Life Path Number</h3>
              <p className="text-purple-100">
                Derived from your birth date, this number reveals your life's purpose and the path you'll take to
                fulfill it. It represents your traits, opportunities, and challenges.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-2">Destiny Number</h3>
              <p className="text-purple-100">
                Calculated from all letters in your full birth name, this number reveals your goals, purpose, and the
                opportunities you'll encounter throughout life.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-2">Soul Urge Number</h3>
              <p className="text-purple-100">
                Derived from the vowels in your name, this number reveals your inner desires, motivations, and what your
                heart truly yearns for.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-2">Personality Number</h3>
              <p className="text-purple-100">
                Calculated from the consonants in your name, this number reveals how others perceive you and the
                personality you project to the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
