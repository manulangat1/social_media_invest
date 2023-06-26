provider "aws" {
  region     = "us-west-1"
  access_key = ""
  secret_key = ""
}

variable "cidr_block" {

  description = "This is the cidr block defination"
  default     = "10.0.0.0/16"
  type        = string

}
resource "aws_vpc" "my-development-vpc" {
  cidr_block = var.cidr_block

  tags = {
    "Name" : "My vpc id"
  }
}


resource "aws_subnet" "my-subnet-1" {
  availability_zone = "us-west-1b"
  vpc_id            = aws_vpc.my-development-vpc.id
  cidr_block        = "10.0.10.0/24"

  tags = {
    "Name" : "my other subnet"
  }
}


resource "aws_internet_gateway" "my-app_igw" {
  vpc_id = aws_vpc.my-development-vpc.id
  tags = {
    "Name" : "My app igw"
  }
}
resource "aws_route_table" "my-app-route-table" {
  vpc_id = aws_vpc.my-development-vpc.id


  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my-app_igw.id

  }
  tags = {
    "Name" : "Route table",
    "CreatedBy" : "Emmanuel Langat"
  }
}

resource "aws_route_table_association" "a-rtb" {
  route_table_id = aws_route_table.my-app-route-table.id
  subnet_id      = aws_subnet.my-subnet-1.id
}

resource "aws_security_group" "my-app-sg" {
  name   = "my-sg"
  vpc_id = aws_vpc.my-development-vpc.id


  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]

  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]

  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
    prefix_list_ids = []
  }

  tags = {
    "Name" : "dev-sg"
  }

}


# data "aws_ami" "ec2-id" {
#   most_recent = true 
#   owners = ["amazon"]
#   filter { 
#     name = "name"
#     values = "ami-0bd4d695347c0ef88"
#   }
# } 

resource "aws_instance" "my-ec2-instance" {

  ami           = "ami-0bd4d695347c0ef88"
  instance_type = "t2.micro"

  subnet_id = aws_subnet.my-subnet-1.id

  vpc_security_group_ids = [aws_security_group.my-app-sg.id]

  availability_zone = "us-west-1b"

  associate_public_ip_address = true

  key_name =  "server-key-pair"
  tags = {
    "Name" : "Dev-api"
  }

}
