import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dateCreated: string;
  lastUpdated: string;
  description: string;
}

const mockTickets: SupportTicket[] = [
  {
    id: "1",
    ticketNumber: "#TK-00001",
    subject: "Order delivery issue",
    category: "Order",
    status: "open",
    priority: "high",
    dateCreated: "25/08/25",
    lastUpdated: "25/08/25, 3:45 PM",
    description: "My order hasn't been delivered yet and it's been 5 days since the expected delivery date."
  },
  {
    id: "2",
    ticketNumber: "#TK-00002",
    subject: "Product quality concern",
    category: "Delivery",
    status: "in-progress",
    priority: "medium",
    dateCreated: "24/08/25",
    lastUpdated: "25/08/25, 10:30 AM",
    description: "The product I received has some quality issues that I'd like to discuss."
  },
  {
    id: "3",
    ticketNumber: "#TK-00003",
    subject: "Website login problem",
    category: "Maintenance",
    status: "resolved",
    priority: "low",
    dateCreated: "23/08/25",
    lastUpdated: "24/08/25, 2:15 PM",
    description: "I'm having trouble logging into my account on the website."
  },
  {
    id: "4",
    ticketNumber: "#TK-00004",
    subject: "Return request processing",
    category: "Enquiry",
    status: "closed",
    priority: "medium",
    dateCreated: "22/08/25",
    lastUpdated: "23/08/25, 4:20 PM",
    description: "I would like to return an item I purchased last week."
  },
  {
    id: "5",
    ticketNumber: "#TK-00005",
    subject: "Payment verification needed",
    category: "Order",
    status: "open",
    priority: "urgent",
    dateCreated: "21/08/25",
    lastUpdated: "22/08/25, 9:00 AM",
    description: "There seems to be an issue with payment verification for my recent order."
  },
];

const categories = [
  { value: "order", label: "Order" },
  { value: "delivery", label: "Delivery" },
  { value: "maintenance", label: "Maintenance" },
  { value: "enquiry", label: "Enquiry" },
];

export function SupportTicketsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    category: "",
  });
  const [subjectCount, setSubjectCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  const ticketsPerPage = 10;

  const { totalPages, startIndex, endIndex, currentTickets } = useMemo(() => {
    const totalPages = Math.ceil(mockTickets.length / ticketsPerPage);
    const startIndex = (currentPage - 1) * ticketsPerPage;
    const endIndex = startIndex + ticketsPerPage;
    const currentTickets = mockTickets.slice(startIndex, endIndex);

    return {
      totalPages,
      startIndex,
      endIndex,
      currentTickets,
    };
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'subject') {
      setSubjectCount(value.length);
    } else if (field === 'message') {
      setMessageCount(value.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    
    // Reset form and close
    setFormData({ subject: "", message: "", category: "" });
    setSubjectCount(0);
    setMessageCount(0);
    setShowTicketForm(false);
  };

  const handleCancel = () => {
    setFormData({ subject: "", message: "", category: "" });
    setSubjectCount(0);
    setMessageCount(0);
    setShowTicketForm(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Support Tickets</CardTitle>
          {!showTicketForm && (
            <Button onClick={() => setShowTicketForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Submit new
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!showTicketForm ? (
          <>
            {/* Header with ticket count */}
            <div className="flex justify-between items-center gap-4 mb-6">
              <div className="text-sm text-gray-600">
                {mockTickets.length} Tickets - Showing {startIndex + 1}-{Math.min(endIndex, mockTickets.length)} of {mockTickets.length}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block border rounded-lg">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b font-medium text-gray-700 text-sm">
                <div>TICKET</div>
                <div>SUBJECT</div>
                <div>CATEGORY</div>
                <div>STATUS</div>
                <div className="text-right">DATE CREATED</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-100">
                {currentTickets.map((ticket) => (
                  <Link
                    key={ticket.id}
                    to={`/profile/tickets/${ticket.id}`}
                    className="block hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      {/* Ticket Number */}
                      <div className="text-sm font-medium text-gray-900">
                        {ticket.ticketNumber}
                      </div>

                      {/* Subject */}
                      <div>
                        <span className="text-sm font-bold text-gray-600">
                          {ticket.subject}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="text-sm text-gray-600">
                        {ticket.category}
                      </div>

                      {/* Status */}
                      <div>
                        <span className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                          ticket.status === 'open' && "bg-red-100 text-red-800",
                          ticket.status === 'in-progress' && "bg-blue-100 text-blue-800",
                          ticket.status === 'resolved' && "bg-green-100 text-green-800",
                          ticket.status === 'closed' && "bg-gray-100 text-gray-800"
                        )}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>

                      {/* Date Created */}
                      <div className="text-right text-gray-600 text-sm">
                        {ticket.dateCreated}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {currentTickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  to={`/profile/tickets/${ticket.id}`}
                  className="block"
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header Row */}
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-gray-700 truncate">
                              {ticket.subject}
                            </h3>
                          </div>
                          <div className="ml-2 flex-shrink-0">
                            <span className={cn(
                              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                              ticket.status === 'open' && "bg-red-100 text-red-800",
                              ticket.status === 'in-progress' && "bg-blue-100 text-blue-800",
                              ticket.status === 'resolved' && "bg-green-100 text-green-800",
                              ticket.status === 'closed' && "bg-gray-100 text-gray-800"
                            )}>
                              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace('-', ' ')}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-600">
                            {ticket.ticketNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {ticket.category}
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <div className="text-xs text-gray-500">
                            Created: {ticket.dateCreated}
                          </div>
                          <div className="text-xs text-gray-400">
                            Updated: {ticket.lastUpdated}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 pt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous Page
                </Button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="min-w-[2.5rem]"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1"
                >
                  Next Page
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          /* New Ticket Form */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Add Support Ticket</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject Field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject
                  </Label>
                  <span className="text-xs text-gray-500">
                    {subjectCount}/250
                  </span>
                </div>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleFormChange('subject', e.target.value)}
                  maxLength={250}
                  className="w-full bg-gray-50"
                  placeholder="Enter ticket subject"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </Label>
                  <span className="text-xs text-gray-500">
                    {messageCount}/1000
                  </span>
                </div>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  maxLength={1000}
                  rows={8}
                  className="w-full bg-gray-50 resize-none"
                  placeholder="Describe your issue in detail"
                  required
                />
              </div>

              {/* Category Field */}
              <div>
                <Label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1 block">
                  Set Enquiry
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleFormChange('category', value)}>
                  <SelectTrigger className="w-full bg-gray-50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" className="px-8">
                  Submit Ticket
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SupportTicketsPage;

